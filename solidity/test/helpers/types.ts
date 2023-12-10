export interface PropertyDataStruct {
  location: string;
  description: string;
  landlord: `0x${string}`;
  area: number;
  previewCID: string;
  folderCID: string;
}

export enum PropertyStatus {
  New = 0,
  Rent = 1,
}

export enum PaymentType {
  Weekly = 0,
  Monthly = 1,
}

export interface CreateListingManagerStruct {
  propertyID: string;
  price: bigint;
  payment: PaymentType;
}

export interface CreateListingStruct {
  propertyID: string;
  price: bigint;
  payment: PaymentType;
  isNative: boolean;
}

export interface AcceptListingStruct {
  propertyID: string;
  rentStart: bigint;
  rentFinish: bigint;
}

export interface AcceptMarketplaceListingStruct {
  propertyID: string;
  tenant: `0x${string}`;
  rentStart: bigint;
  rentFinish: bigint;
}

export interface FeesStruct {
  feeReceiver: `0x${string}`;
  feeAmount: bigint;
}

export interface SigningDataStruct {
  propertyID: `0x${string}`;
  location: string;
  landlord: `0x${string}`;
  tenant: `0x${string}`;
  isNative: boolean;
  price: bigint;
  rentStart: bigint;
  rentFinish: bigint;
  agreementTimestamp: bigint;
}

export interface MarketplaceBrokerDataStruct {
  price: bigint;
  payment: PaymentType;
  status: PropertyStatus;
  tenant: `0x${string}`;
  rentStart: bigint;
  rentFinish: bigint;
  isNative: boolean;
}

export interface PropertyBrokerDataStruct {
  propertyID: `0x${string}`;
  location: string;
  landlord: `0x${string}`;
  area: number;
  folderCID: string;
}

export interface PaymentScheduleDataStruct {
  landlord: `0x${string}`;
  tenant: `0x${string}`;
  payment: PaymentType;
  price: bigint;
  totalDepositCount: bigint;
  totalWithdrawalCount: bigint;
  rentStart: bigint;
  rentFinish: bigint;
  lastPayment: bigint;
  isFinished: boolean;
}
