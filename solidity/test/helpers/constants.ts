import {
  createTestClient,
  http,
  parseEther,
  publicActions,
  walletActions,
} from "viem";
import { hardhat } from "viem/chains";
import {
  AcceptListingStruct,
  CreateListingManagerStruct,
  CreateListingStruct,
  FeesStruct,
  PaymentType,
  PropertyDataStruct,
  SigningDataStruct,
  MarketplaceBrokerDataStruct,
  PropertyBrokerDataStruct,
  PropertyStatus,
  AcceptMarketplaceListingStruct,
  PaymentScheduleDataStruct,
} from "./types";

const location = "Khreschatyk str. 1";
const description =
  "Lorem ipsum dolor sit amet, bogdan gay consectetur adipiscing elit. Fusce eleifend vitaliy loh tortor neque.";
const area = 48;
const previewCID =
  "bafybeia7sztz5j2hc7vmtomrsjp5sjh4tev6wr63shgfvrfxv4bt4xjn2i";
const folderCID = "bafybeia7sztz5j2hc7vmtomrsjp5sjh4tev6wr63shgfvrfxv4bt4xjn2i";

const tenantAddress = "0x6C414e7A15088023E28Af44ad0e1d593671e4B15";
// USDC has 6 decimals, not 18
const priceUSDC = 500000000n;
const feeReceiver = "0x811AE8434b584dfde82C14102820570611d47A59";
const feeAmount = parseEther("10");

const client = createTestClient({
  chain: hardhat,
  mode: "hardhat",
  transport: http(),
})
  .extend(publicActions)
  .extend(walletActions);

export const getTestClient = () => {
  return client;
};

export const fees: FeesStruct = {
  feeReceiver,
  feeAmount: feeAmount,
};

export const getPropertyData = (landlord: `0x${string}`) => {
  const propertyData: PropertyDataStruct = {
    location,
    description,
    landlord,
    area,
    previewCID,
    folderCID,
  };
  return propertyData;
};

export const getPropertyBrokerData = (
  landlord: `0x${string}`,
  propertyID: `0x${string}`
) => {
  const propertyData: PropertyBrokerDataStruct = {
    propertyID,
    location,
    landlord,
    area,
    folderCID,
  };
  return propertyData;
};

export const getMarketplaceBrokerData = async (
  tenant: `0x${string}`,
  propertyID: `0x${string}`
) => {
  const client = getTestClient();
  const block = await client.getBlock();

  const rentStart = block.timestamp as bigint;
  const rentFinish = rentStart + 2592000n; // 30 days

  const marketplaceData: MarketplaceBrokerDataStruct = {
    price: priceUSDC,
    payment: PaymentType.Weekly,
    status: PropertyStatus.New,
    tenant,
    rentStart,
    rentFinish,
    isNative: true,
  };
  return marketplaceData;
};

export const getCreateListingManagerData = (
  propertyID: string,
  price?: bigint,
  payment?: PaymentType
) => {
  const createListingManagerData: CreateListingManagerStruct = {
    propertyID,
    price: price ?? priceUSDC,
    payment: payment ?? PaymentType.Weekly,
  };
  return createListingManagerData;
};

export const getCreateListingData = (propertyID: string) => {
  const createListingData: CreateListingStruct = {
    propertyID,
    price: priceUSDC,
    payment: PaymentType.Weekly,
    isNative: true,
  };
  return createListingData;
};

export const getAcceptListingData = async (
  propertyID: string,
  rentFinish?: bigint
) => {
  const client = getTestClient();
  const block = await client.getBlock();
  // this error occurs because block.timestamp is from the start of the hardhat node;
  const timestamp: bigint = block.timestamp + 5000n;

  const acceptListingData: AcceptListingStruct = {
    propertyID,
    rentStart: timestamp,
    rentFinish: timestamp + 2592000n,
  };
  return acceptListingData;
};

export const getAcceptMarketplaceListingData = async (
  propertyID: string,
  rentFinish?: bigint
) => {
  const client = getTestClient();
  const block = await client.getBlock();
  const timestamp = block.timestamp;

  const rentStart = timestamp as bigint;

  const acceptMarketplaceListingData: AcceptMarketplaceListingStruct = {
    propertyID,
    tenant: tenantAddress,
    rentStart,
    rentFinish: rentFinish ?? rentStart + 2592000n,
  };
  return acceptMarketplaceListingData;
};

export const getSigningData = async (
  propertyID: `0x${string}`,
  landlord: `0x${string}`,
  rentStart?: bigint,
  rentFinish?: bigint,
  isNative?: boolean,
) => {
  const client = getTestClient();
  const block = await client.getBlock();
  const timestamp = block.timestamp;
  const startTime = timestamp + 200n;
  const finishTime = timestamp + 2591800n;

  const signingData: SigningDataStruct = {
    propertyID,
    location: location,
    landlord,
    price: priceUSDC,
    tenant: tenantAddress,
    rentStart: rentStart ?? startTime,
    rentFinish: rentFinish ?? finishTime,
    agreementTimestamp: timestamp,
    isNative: isNative ?? true
  };
  return signingData;
};

export const getPaymentScheduleData = async (
  landlord: `0x${string}`,
  tenant: `0x${string}`,
  listingData: AcceptListingStruct,
  totalDepositCount: bigint,
  totalWithdrawalCount: bigint,
  price?: bigint,
  payment?: PaymentType,
  isFinished?: boolean,
) => {
  const client = getTestClient();
  const block = await client.getBlock();
  const timestamp = block.timestamp;

  const signingData: PaymentScheduleDataStruct = {
    landlord,
    tenant,
    payment: payment ?? PaymentType.Weekly,
    price: price ?? priceUSDC,
    totalDepositCount,
    totalWithdrawalCount,
    rentStart: listingData.rentStart,
    rentFinish: listingData.rentFinish,
    lastPayment: timestamp,
    isFinished: isFinished ?? false
  };
  return signingData;
};