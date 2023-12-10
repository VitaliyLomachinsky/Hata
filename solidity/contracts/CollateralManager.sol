//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {IERC20, SafeERC20, Initializable} from "./Exports.sol";
import {Ownable} from "./utils/Ownable.sol";

/// @notice Stores user collaterals

contract CollateralManager is Ownable {
    using SafeERC20 for IERC20;

    error CollateralWithdrawalFailed();

    mapping(address => mapping(bytes32 => uint256)) private collateralUSDC;
    mapping(address => mapping(bytes32 => uint256)) private collateralETH;

    IERC20 private USDC;

    constructor(address _owner, IERC20 _USDC) Ownable(_owner) {
        USDC = _USDC;
    }

    function addCollateralETH(
        address _owner,
        bytes32 _propertyID,
        uint256 _amount
    ) external payable onlyOwner {
        collateralETH[_owner][_propertyID] = _amount;
    }

    function addCollateralUSDC(
        address _owner,
        bytes32 _propertyID,
        uint256 _amount
    ) external onlyOwner {
        collateralUSDC[_owner][_propertyID] = _amount;
        USDC.safeTransferFrom(_owner, address(this), _amount);
    }

    function withdrawCollateralETH(
        address _owner,
        bytes32 _propertyID
    ) external onlyOwner {
        (bool success, ) = _owner.call{
            value: collateralETH[_owner][_propertyID]
        }("");

        if (!success) {
            revert CollateralWithdrawalFailed();
        }
    }

    function withdrawCollateralUSDC(
        address _owner,
        bytes32 _propertyID
    ) external onlyOwner {
        USDC.safeTransfer(_owner, collateralUSDC[_owner][_propertyID]);
    }

    function getCollateralUSDC(
        address _owner,
        bytes32 propertyID
    ) external view returns (uint256) {
        return collateralUSDC[_owner][propertyID];
    }

    function getCollateralETH(
        address _owner,
        bytes32 propertyID
    ) external view returns (uint256) {
        return collateralETH[_owner][propertyID];
    }
}
