//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.20;

enum PropertyStatus {
    New,
    Rent
}

//todo: Daily
enum PaymentType {
    Weekly,
    Monthly
}

struct FeeType {
    address feeReceiver;
    uint256 feeAmount;
}

struct PropertyData {
    bytes32 propertyID; // unique ID of property
    string location; // title of the property
    string description;
    address landlord; // address of the owner
    uint16 area; // area of appartments
    string previewCID; // IPFS image with preview
    string folderCID; // IPFS folder with data
}

struct MarketplaceData {
    uint256 price; // USD Price
    PaymentType payment;
    PropertyStatus status; // is it under rent?
    address tenant;
    uint256 rentStart;
    uint256 rentFinish;
    bool isNative; // USDC or ETH
}
struct BrokerData {
    bool isSigned;
    SigningData sdata;
    bytes landlordSignature;
    bytes tenantSignature;
}

struct SigningData {
    bytes32 propertyID; // unique ID of property
    string location; // title of the property
    address landlord; // address of the owner
    address tenant; // address of the tenant
    bool isNative; // USDC or ETH
    uint256 price; // USD Price over the payment period
    uint256 rentStart;
    uint256 rentFinish;
    uint256 agreementTimestamp;
}

struct PaymentSchedule {
    address landlord;
    address tenant;
    PaymentType payment;
    uint256 price;
    uint256 totalDepositCount;
    uint256 totalWithdrawalCount;
    uint256 rentStart;
    uint256 rentFinish;
    uint256 lastPayment;
    bool isFinished;
}

struct Payment {
    uint256 unlockedAt;
    uint256 amount;
}
