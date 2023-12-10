//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

interface IMarketplace {
    function createListing(
        bytes32 propertyID,
        address _owner,
        uint256 price,
        bool isNative
    ) external;
}
