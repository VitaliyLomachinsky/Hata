//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {PropertyData} from "./Types.sol";
import {Ownable} from "./utils/Ownable.sol";

/// @notice This contract stores data about all property registered in the system

contract Registry is Ownable {
    mapping(address => bytes32[]) private hashesByLandlord;
    mapping(bytes32 => bool) private isHashUsed;
    mapping(bytes32 => PropertyData) private propertyData;

    event PropertyAdded(
        bytes32 indexed propertyID,
        address landlord,
        string location,
        uint16 area,
        string previewCID
    );

    constructor(address _owner) Ownable(_owner) {}

    function addProperty(
        string calldata _location,
        string calldata _description,
        address _landlord,
        uint16 _area,
        string calldata _previewCID,
        string calldata _folderCID
    ) external onlyOwner returns (bytes32) {
        bytes32 _propertyID = keccak256(abi.encode(_location, _landlord));

        hashesByLandlord[_landlord].push(_propertyID);
        isHashUsed[_propertyID] = true;
        propertyData[_propertyID] = PropertyData(
            _propertyID,
            _location,
            _description,
            _landlord,
            _area,
            _previewCID,
            _folderCID
        );

        emit PropertyAdded(
            _propertyID,
            _landlord,
            _location,
            _area,
            _previewCID
        );
        return _propertyID;
    }

    function getIsHashUsed(bytes32 _propertyID) external view returns (bool) {
        return isHashUsed[_propertyID];
    }

    function getPropertyByOwner(
        address _landlord
    ) external view returns (bytes32[] memory) {
        return hashesByLandlord[_landlord];
    }

    function getProperty(
        bytes32 _propertyID
    ) external view returns (PropertyData memory) {
        return propertyData[_propertyID];
    }
}
