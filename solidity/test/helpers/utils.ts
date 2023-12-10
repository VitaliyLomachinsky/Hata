import { expect } from "chai";
import hre from "hardhat";
import { CreateListingStruct, PaymentScheduleDataStruct, PropertyDataStruct } from "./types";

export const getAddPropertyReturnValue = async (tx: `0x${string}`, arrayIndex: number) => {
  const publicClient = await hre.viem.getPublicClient();
  const result = await publicClient.waitForTransactionReceipt({ hash: tx });
  return result.logs[arrayIndex].topics[1];
};

export const comparePropertyData = (
  expected: PropertyDataStruct,
  actual: PropertyDataStruct
) => {
  expect(expected.location).to.equal(actual.location);
  expect(expected.landlord.toLocaleLowerCase()).to.equal(
    actual.landlord.toLocaleLowerCase())
  expect(expected.area).to.equal(actual.area);
  expect(expected.folderCID).to.equal(actual.folderCID);
};

export const compareMarketplaceData = (
  expected: CreateListingStruct,
  actual: CreateListingStruct
) => {
  expect(expected.price).to.equal(actual.price);
  expect(expected.isNative).to.equal(actual.isNative);
  expect(expected.payment).to.equal(actual.payment);
};

export const comparePaymentScheduledata = (
  expected: PaymentScheduleDataStruct,
  actual: PaymentScheduleDataStruct
) => {
  expect(expected.landlord.toLowerCase()).to.equal(actual.landlord.toLowerCase());
  expect(expected.tenant.toLowerCase()).to.equal(actual.tenant.toLowerCase());
  expect(expected.payment).to.equal(actual.payment);
  expect(expected.price).to.equal(actual.price);
  expect(expected.totalDepositCount).to.equal(actual.totalDepositCount);
  expect(expected.totalWithdrawalCount).to.equal(actual.totalWithdrawalCount);
  expect(expected.rentStart).to.equal(actual.rentStart);
  expect(expected.rentFinish).to.equal(actual.rentFinish);
  expect(parseInt(actual.lastPayment.toString())).to.gte(parseInt(expected.lastPayment.toString()));
  expect(expected.isFinished).to.equal(actual.isFinished);
};

