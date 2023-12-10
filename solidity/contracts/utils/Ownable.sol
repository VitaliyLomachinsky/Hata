//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

contract Ownable {
    address public owner;

    error CallerNotOwner();

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function _checkOwner() internal view {
        if (msg.sender != owner) {
            revert CallerNotOwner();
        }
    }
}
