//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {IERC20, SafeERC20, Initializable} from "./Exports.sol";
import {Registry} from "./Registry.sol";
import {Marketplace} from "./Marketplace.sol";
import {Broker} from "./Broker.sol";
import {CollateralManager} from "./CollateralManager.sol";
import {Intermediary} from "./Intermediary.sol";
import {StreamsLookupChainlinkAutomation} from "./DataStream/ETHUSDPriceDataStream.sol";
import {Ownable} from "./utils/Ownable.sol";

import {FeeType, MarketplaceData, PropertyStatus, PropertyData, SigningData, PaymentType} from "./Types.sol";

contract Manager is Initializable, Ownable {
    using SafeERC20 for IERC20;

    uint256 private constant PRICE_DENOMINATOR = 10000;

    FeeType private fees;

    uint256 private collateralPercent = 5000;
    mapping(address user => uint256 collateralAmount) private collaterals;

    Registry private registry;
    Marketplace private market;
    Broker private broker;
    CollateralManager private collateralManager;
    Intermediary private intermediary;

    StreamsLookupChainlinkAutomation private dataStream;

    IERC20 private USDC;

    error InvaidSigner();
    error FailedETHTransfer();
    error InvalidETHValue();
    error InvalidTimestamp();
    error InvaidDates();
    error ValueOutOfRentRange();
    error ManagerInvalidUSDCValue(
        uint256 pendingAmount,
        uint256 transferredAmount
    );
    error ManagerInvalidETHValue(
        uint256 pendingAmount,
        uint256 transferredAmount
    );
    error InvalidPropertyID();
    error CallerNotPropertyOwner();
    error InvalidRentTimestamps();
    error InvalidRentLength();

    modifier isHashUsed(bytes32 propertyID) {
        _isHashUsed(propertyID);
        _;
    }

    constructor(
        address _owner,
        IERC20 _USDC,
        StreamsLookupChainlinkAutomation _dataStream,
        FeeType memory _fees
    ) Ownable(_owner) {
        USDC = _USDC;
        dataStream = _dataStream;
        fees = _fees;
    }

    receive() external payable {}

    function initialize(
        Registry _registry,
        Marketplace _market,
        Broker _broker,
        CollateralManager _collateralManager,
        Intermediary _intermediary
    ) external onlyOwner initializer {
        registry = _registry;
        market = _market;
        broker = _broker;
        collateralManager = _collateralManager;
        intermediary = _intermediary;
    }

    function addPropertyETH(
        string calldata _location,
        string calldata _description,
        address _landlord,
        uint16 _area,
        string calldata _previewCID,
        string calldata _folderCID
    ) external payable returns (bytes32) {
        _payFeesEth();
        return
            _addNewProperty(
                _location,
                _description,
                _landlord,
                _area,
                _previewCID,
                _folderCID
            );
    }

    function addPropertyUSDC(
        string calldata _location,
        string calldata _description,
        address _landlord,
        uint16 _area,
        string calldata _previewCID,
        string calldata _folderCID
    ) external returns (bytes32) {
        _payFeesUSDC();
        return
            _addNewProperty(
                _location,
                _description,
                _landlord,
                _area,
                _previewCID,
                _folderCID
            );
    }

    function createListingETH(
        bytes32 _propertyID,
        uint256 _price,
        PaymentType _payment
    ) external payable isHashUsed(_propertyID) {
        _isCallerOwner(_propertyID);

        uint256 collateralAmount = _calculateCollateral(_price, _payment);

        uint256 ethAmount = calculatePriceEth(collateralAmount);
        _isProperETHValue(ethAmount);

        collateralManager.addCollateralETH{value: ethAmount}(
            msg.sender,
            _propertyID,
            ethAmount
        );

        market.createListing(_propertyID, ethAmount, _payment, true);
    }

    function createListingUSDC(
        bytes32 _propertyID,
        uint256 price,
        PaymentType payment
    ) external isHashUsed(_propertyID) {
        _isCallerOwner(_propertyID);

        uint256 collateralAmount = _calculateCollateral(price, payment);
        collateralManager.addCollateralUSDC(
            msg.sender,
            _propertyID,
            collateralAmount
        );

        market.createListing(_propertyID, price, payment, false);
    }

    function acceptListing(
        bytes32 _propertyID,
        uint256 _rentStart,
        uint256 _rentFinish
    ) external isHashUsed(_propertyID) {
        if (block.timestamp > _rentStart || _rentStart > _rentFinish) {
            revert InvalidRentTimestamps();
        }

        if ((_rentFinish - _rentStart) % 1 days != 0) {
            revert InvalidRentLength();
        }
        market.acceptListing(_propertyID, msg.sender, _rentStart, _rentFinish);

        (MarketplaceData memory mdata, PropertyData memory pdata) = market
            .getListingWithData(_propertyID);
        broker.createAgreement(mdata, pdata);
    }

    function signAgreement(
        bytes32 propertyID,
        bytes memory signature
    ) external isHashUsed(propertyID) {
        broker.signAgreement(propertyID, signature);
    }

    function startRent(bytes32 _propertyID) external isHashUsed(_propertyID) {
        (MarketplaceData memory mdata, PropertyData memory pdata) = market
            .getListingWithData(_propertyID);

        if (msg.sender != mdata.tenant) {
            revert InvaidSigner();
        }
        intermediary.makeFirstPayment(
            _propertyID,
            pdata.landlord,
            mdata.tenant,
            mdata.price,
            mdata.payment,
            mdata.rentStart,
            mdata.rentFinish
        );
    }

    function payRent(bytes32 _propertyID) external isHashUsed(_propertyID) {
        (MarketplaceData memory mdata, ) = market.getListingWithData(
            _propertyID
        );

        if (msg.sender != mdata.tenant) {
            revert InvaidSigner();
        }

        intermediary.makeScheduledPayment(_propertyID);
    }

    function payFullRent(bytes32 _propertyID) external isHashUsed(_propertyID) {
        (MarketplaceData memory mdata, ) = market.getListingWithData(
            _propertyID
        );

        if (msg.sender != mdata.tenant) {
            revert InvaidSigner();
        }

        intermediary.makeFullPayment(_propertyID);
    }

    function receiveFunds(
        bytes32 _propertyID
    ) external isHashUsed(_propertyID) {
        (, PropertyData memory pdata) = market.getListingWithData(_propertyID);

        if (msg.sender != pdata.landlord) {
            revert InvaidSigner();
        }

        intermediary.withdawFunds(_propertyID);
    }

    function receiveFullFunds(
        bytes32 _propertyID
    ) external isHashUsed(_propertyID) {
        (, PropertyData memory pdata) = market.getListingWithData(_propertyID);

        if (msg.sender != pdata.landlord) {
            revert InvaidSigner();
        }

        intermediary.withdawFullFunds(_propertyID);
    }

    function calculatePriceEth(uint256 _price) public view returns (uint256) {
        uint256 ethPerUsd = dataStream.latestETHUSDPrice();
        uint256 precision = 1e16;

        uint256 ethAmount = ((_price * precision) / ethPerUsd);
        return ethAmount;
    }

    function _addNewProperty(
        string calldata _location,
        string calldata _description,
        address _landlord,
        uint16 _area,
        string calldata _previewCID,
        string calldata _folderCID
    ) internal returns (bytes32) {
        return
            registry.addProperty(
                _location,
                _description,
                _landlord,
                _area,
                _previewCID,
                _folderCID
            );
    }

    function _payFeesUSDC() internal returns (bool) {
        FeeType memory _fees = fees;
        uint256 senderBalance = USDC.balanceOf(msg.sender);

        if (senderBalance < _fees.feeAmount) {
            revert ManagerInvalidUSDCValue(_fees.feeAmount, senderBalance);
        }

        USDC.safeTransferFrom(msg.sender, _fees.feeReceiver, _fees.feeAmount);
        return true;
    }

    function _payFeesEth() internal returns (bool success) {
        FeeType memory _fees = fees;
        uint256 ethAmount = calculatePriceEth(_fees.feeAmount);
        _isProperETHValue(ethAmount);

        (success, ) = _fees.feeReceiver.call{value: ethAmount}("");
        if (!success) {
            revert FailedETHTransfer();
        }
    }

    function _calculateCollateral(
        uint256 price,
        PaymentType payment
    ) internal view returns (uint256) {
        if (payment == PaymentType.Weekly) {
            return price;
        } else {
            return (price * collateralPercent) / PRICE_DENOMINATOR;
        }
    }

    function _isHashUsed(bytes32 propertyID) internal view {
        bool validID = registry.getIsHashUsed(propertyID);
        if (!validID) {
            revert InvalidPropertyID();
        }
    }

    function _isCallerOwner(bytes32 _propertyID) internal view {
        PropertyData memory pdata = registry.getProperty(_propertyID);
        if (pdata.landlord != msg.sender) {
            revert CallerNotPropertyOwner();
        }
    }

    function _isProperETHValue(uint256 _ethAmount) internal view {
        if (_ethAmount != msg.value) {
            revert InvalidETHValue();
        }
    }
}
