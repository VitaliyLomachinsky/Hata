// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDCMock is ERC20 {
    uint8 private constant DECIMALS = 6;

    constructor() ERC20("Mock USD Coin", "mUSDC") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        _burn(from, amount);
    }

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }
}
