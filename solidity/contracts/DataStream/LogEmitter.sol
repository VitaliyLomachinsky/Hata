// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.16;

contract LogEmitter {
    event Log(address indexed msgSender);

    function emitLog() public {
        emit Log(msg.sender);
    }
}
