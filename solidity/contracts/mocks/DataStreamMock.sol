//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

contract DataStreamMock {
    function latestETHUSDPrice() external view returns (uint256) {
        return 20534878e12;
    }
}
