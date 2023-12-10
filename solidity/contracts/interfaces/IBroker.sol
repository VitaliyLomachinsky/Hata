//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

interface IBroker {
    function getPrice(uint16 priceId) external view returns (uint);
}
