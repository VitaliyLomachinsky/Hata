//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {AgreementToken} from "./AgreementToken.sol";
import {Initializable, EIP712, ECDSA} from "./Exports.sol";
import {MarketplaceData, PropertyStatus, PropertyData, BrokerData, SigningData} from "./Types.sol";
import {Ownable} from "./utils/Ownable.sol";

/// @notice Acts as an intermediary between two users who
///         want to settle a rent agreement.
contract Broker is Initializable, EIP712, Ownable {
    AgreementToken private token;

    mapping(bytes32 => BrokerData[]) agreements;

    bytes32 constant SIGNINGDATA_TYPEHASH =
        keccak256(
            "SigningData(bytes32 propertyID,string location,address landlord,address tenant,bool isNative,uint256 price,uint256 rentStart,uint256 rentFinish,uint256 agreementTimestamp)"
        );

    error IncorrectSigner(address signer);
    error IncorrectPropertyId(bytes32 propertyId);

    constructor(address _owner) EIP712("Agreement", "1") Ownable(_owner) {}

    function initialize(AgreementToken _token) external initializer {
        token = _token;
    }

    function createAgreement(
        MarketplaceData memory _mdata,
        PropertyData memory _pdata
    ) external onlyOwner {
        SigningData memory sdata = SigningData(
            _pdata.propertyID,
            _pdata.location,
            _pdata.landlord,
            _mdata.tenant,
            _mdata.isNative,
            _mdata.price,
            _mdata.rentStart,
            _mdata.rentFinish,
            block.timestamp
        );
        BrokerData memory bdata = BrokerData(false, sdata, "", "");
        agreements[_pdata.propertyID].push(bdata);
    }

    function signAgreement(
        bytes32 propertyID,
        bytes memory signature
    ) external onlyOwner {
        if (agreements[propertyID].length == 0) {
            revert IncorrectPropertyId(propertyID);
        }

        uint256 latestAgreement = (agreements[propertyID].length) - 1;
        BrokerData memory data = agreements[propertyID][latestAgreement];

        bytes32 structHash = hashSigningData(data.sdata);
        bytes32 typedHash = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(typedHash, signature);

        if (signer == data.sdata.landlord) {
            data.landlordSignature = signature;
            if (keccak256(data.tenantSignature) != keccak256("")) {
                data.isSigned = true;
            }
        } else if (signer == data.sdata.tenant) {
            data.tenantSignature = signature;
            if (keccak256(data.landlordSignature) != keccak256("")) {
                data.isSigned = true;
            }
        } else {
            revert IncorrectSigner(signer);
        }

        agreements[propertyID][latestAgreement] = data;

        if (data.isSigned) {
            token.mint(signer, data.sdata);
        }
    }

    function getAgreementSigningData(
        bytes32 _propertyID
    ) external view returns (SigningData memory) {
        uint256 latestAgreement = (agreements[_propertyID].length) - 1;

        return agreements[_propertyID][latestAgreement].sdata;
    }

    function hashSigningData(
        SigningData memory params
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    SIGNINGDATA_TYPEHASH,
                    params.propertyID,
                    keccak256(bytes(params.location)),
                    params.landlord,
                    params.tenant,
                    params.isNative,
                    params.price,
                    params.rentStart,
                    params.rentFinish,
                    params.agreementTimestamp
                )
            );
    }
}
