//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

import {IERC20, SafeERC20} from "./Exports.sol";
import {PaymentType, PaymentSchedule} from "./Types.sol";
import {Manager} from "./Manager.sol";
import {Ownable} from "./utils/Ownable.sol";

/// @notice Acts as intermediary between landlord and tenant
contract Intermediary is Ownable {
    using SafeERC20 for IERC20;

    mapping(PaymentType => uint256) private paymentIntervals;
    mapping(bytes32 => PaymentSchedule) private payments;
    IERC20 private USDC;
    Manager private manager;

    error PaymentTooEarly();
    error PaymentScheduleFinished();
    error PaymentWithdrawalFinished();
    error PaymentDepositingShouldBeFinished();

    event PaymentDeposit(bytes32 propertyID, uint256 amount);
    event PaymentWithdrew(bytes32 propertyID, uint256 amount);

    constructor(Manager _manager, IERC20 _USDC) Ownable(address(_manager)) {
        USDC = _USDC;
        manager = _manager;

        paymentIntervals[PaymentType.Weekly] = 7 days;
        paymentIntervals[PaymentType.Monthly] = 30 days;
    }

    function makeFirstPayment(
        bytes32 _propertyID,
        address _landlord,
        address _tenant,
        uint256 _price,
        PaymentType _payment,
        uint256 _rentStart,
        uint256 _rentFinish
    ) external onlyOwner {
        uint256 totalPaymentCount = (_rentFinish - _rentStart) /
            paymentIntervals[_payment];

        PaymentSchedule memory pdata = PaymentSchedule(
            _landlord,
            _tenant,
            _payment,
            _price,
            totalPaymentCount - 1,
            totalPaymentCount,
            _rentStart,
            _rentFinish,
            block.timestamp,
            false
        );

        payments[_propertyID] = pdata;

        USDC.safeTransferFrom(_tenant, address(this), pdata.price);
    }

    function makeScheduledPayment(bytes32 _propertyID) external onlyOwner {
        PaymentSchedule memory pdata = payments[_propertyID];

        if (pdata.isFinished) {
            revert PaymentScheduleFinished();
        }

        //todo: add payment buffer: store the buffer in the mapping with the data
        if (
            pdata.lastPayment + paymentIntervals[pdata.payment] >
            block.timestamp
        ) {
            revert PaymentTooEarly();
        }

        uint256 currentPaymentCount = pdata.totalDepositCount;
        unchecked {
            --currentPaymentCount;
        }

        if (currentPaymentCount == 0) {
            payments[_propertyID].isFinished = true;
        }
        payments[_propertyID].totalDepositCount = currentPaymentCount;
        payments[_propertyID].lastPayment = block.timestamp;

        USDC.safeTransferFrom(pdata.tenant, address(this), pdata.price);
        emit PaymentDeposit(_propertyID, pdata.price);
    }

    function makeFullPayment(bytes32 _propertyID) external onlyOwner {
        PaymentSchedule memory pdata = payments[_propertyID];
        uint256 totalAmount = pdata.price * pdata.totalDepositCount;

        if (pdata.isFinished) {
            revert PaymentScheduleFinished();
        }

        payments[_propertyID].lastPayment = block.timestamp;
        payments[_propertyID].totalDepositCount = 0;
        payments[_propertyID].isFinished = true;

        USDC.safeTransferFrom(pdata.tenant, address(this), totalAmount);
        emit PaymentDeposit(_propertyID, totalAmount);
    }

    function withdawFunds(bytes32 _propertyID) external onlyOwner {
        PaymentSchedule memory pdata = payments[_propertyID];

        uint256 currentPaymentCount = pdata.totalWithdrawalCount;
        //TODO: add a check if a week/month has passed
        if (currentPaymentCount == 0) {
            revert PaymentWithdrawalFinished();
        }

        unchecked {
            --currentPaymentCount;
        }

        payments[_propertyID].totalWithdrawalCount = currentPaymentCount;

        USDC.safeTransfer(pdata.landlord, pdata.price);
        emit PaymentWithdrew(_propertyID, pdata.price);
    }

    function withdawFullFunds(bytes32 _propertyID) external onlyOwner {
        PaymentSchedule memory pdata = payments[_propertyID];
        uint256 totalAmount = pdata.price * pdata.totalDepositCount;

        if (pdata.totalWithdrawalCount == 0) {
            revert PaymentWithdrawalFinished();
        }

        if (!pdata.isFinished) {
            revert PaymentDepositingShouldBeFinished();
        }

        payments[_propertyID].totalWithdrawalCount = 0;

        USDC.safeTransfer(pdata.landlord, totalAmount);
        emit PaymentWithdrew(_propertyID, totalAmount);
    }

    function getPayments(
        bytes32 _propertyID
    ) external view returns (PaymentSchedule memory pdata) {
        return payments[_propertyID];
    }
}
