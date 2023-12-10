//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {FeeType} from "../Types.sol";

interface IManager {
    function fees() external view returns (FeeType memory);
}
