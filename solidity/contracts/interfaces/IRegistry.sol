//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {PropertyData} from "../Types.sol";

// @notice This contract stores data about all property registered in the system
interface IRegistry {
    function addProperty(
        bytes32 title,
        address owner,
        uint16 area,
        string calldata folderCID
    ) external returns (bytes32);

    function getIsHashUsed(bytes32 propertyID) external view returns (bool);

    function getProperty(
        bytes32 propertyID
    ) external view returns (PropertyData memory);
}
