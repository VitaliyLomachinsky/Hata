//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {MarketplaceData, PropertyStatus, PropertyData, PaymentType} from "./Types.sol";
import {IERC20, SafeERC20, EnumerableSet} from "./Exports.sol";
import {Registry} from "./Registry.sol";
import {Ownable} from "./utils/Ownable.sol";

contract Marketplace is Ownable {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.Bytes32Set;

    mapping(bytes32 => MarketplaceData) private marketplaceData;

    Registry private registry;

    EnumerableSet.Bytes32Set private activeProperty;

    error OnlyManagerCalls();
    error PropertyNotNew();
    error PropertyNotRent();

    event ListingCreated(
        bytes32 _propertyID,
        uint256 _price,
        PaymentType _payment
    );
    event ListingAccepted(
        bytes32 _propertyID,
        address _tenant,
        uint256 _rentStart,
        uint256 _rentUntil
    );

    constructor(address _owner, Registry _registry) Ownable(_owner) {
        registry = _registry;
    }

    function createListing(
        bytes32 _propertyID,
        uint256 _price,
        PaymentType _payment,
        bool _isNative
    ) external onlyOwner {
        MarketplaceData memory data = marketplaceData[_propertyID];
        if (data.status != PropertyStatus.New) {
            revert PropertyNotNew();
        }

        marketplaceData[_propertyID] = MarketplaceData(
            _price,
            _payment,
            PropertyStatus.New,
            address(0),
            0,
            0,
            _isNative
        );

        activeProperty.add(_propertyID);
        emit ListingCreated(_propertyID, _price, _payment);
    }

    function acceptListing(
        bytes32 _propertyID,
        address _tenant,
        uint256 _rentStart,
        uint256 _rentFinish
    ) external onlyOwner {
        MarketplaceData memory data = marketplaceData[_propertyID];
        if (data.status != PropertyStatus.New) {
            revert PropertyNotNew();
        }

        data.status = PropertyStatus.Rent;
        data.tenant = _tenant;
        data.rentStart = _rentStart;
        data.rentFinish = _rentFinish;
        marketplaceData[_propertyID] = data;

        activeProperty.remove(_propertyID);
        emit ListingAccepted(_propertyID, _tenant, _rentStart, _rentFinish);
    }

    function finishListing(bytes32 _propertyID) external onlyOwner {
        MarketplaceData memory data = marketplaceData[_propertyID];
        if (data.status != PropertyStatus.Rent) {
            revert PropertyNotRent();
        }
        data.status = PropertyStatus.New;
        marketplaceData[_propertyID] = data;
    }

    function getActiveProperty() external view returns (bytes32[] memory) {
        return activeProperty.values();
    }

    function getListing(
        bytes32 _propertyID
    ) external view returns (MarketplaceData memory) {
        return marketplaceData[_propertyID];
    }

    function getListingWithData(
        bytes32 _propertyID
    ) external view returns (MarketplaceData memory, PropertyData memory) {
        return (
            marketplaceData[_propertyID],
            registry.getProperty(_propertyID)
        );
    }
}
