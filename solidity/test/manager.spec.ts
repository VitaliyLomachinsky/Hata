import { loadFixture, time } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { systemDeployFixture } from "./fixtures";
import hre from "hardhat";
import eventemitter2 from "chai-eventemitter2";
import chai, { expect } from "chai";
import {
  fees,
  getAcceptListingData,
  getCreateListingManagerData,
  getPaymentScheduleData,
  getPropertyData,
  getTestClient,
} from "./helpers/constants";
import { parseEther } from "viem";
import { comparePaymentScheduledata, getAddPropertyReturnValue } from "./helpers/utils";
import { AcceptListingStruct, PaymentScheduleDataStruct, PaymentType, SigningDataStruct } from "./helpers/types";

chai.use(eventemitter2());

const ONE_DAY: bigint = 86400n;

describe.only("Manager", () => {
  describe("addPropertyUSDC", () => {
    it("should add property", async () => {
      const { mockUSDC, manager, landlordAddress, owner } =
        await loadFixture(systemDeployFixture);

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData)
      );

      const treasuryBalance = (await mockUSDC.read.balanceOf([
        fees.feeReceiver,
      ])) as bigint;
      const ownerBalance = (await mockUSDC.read.balanceOf([
        owner.account.address,
      ])) as bigint;
      expect(treasuryBalance + ownerBalance).to.eql(parseEther("5000"));
    });
  });

  describe("createListingUSDC", () => {
    it("create listing usdc weekly", async () => {
      const {
        mockUSDC,
        manager,
        collateralManager,
        landlord,
        landlordAddress,
      } = await loadFixture(systemDeployFixture);

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;

      const ownerBalanceBefore = (await mockUSDC.read.balanceOf([
        landlordAddress,
      ])) as bigint;

      const listingData = getCreateListingManagerData(propertyID);
      const collateralAmount = listingData.price;

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const collateralUSDC = (await collateralManager.read.getCollateralUSDC([
        landlordAddress,
        propertyID,
      ])) as bigint;

      const ownerBalanceAfter = (await mockUSDC.read.balanceOf([
        landlordAddress,
      ])) as bigint;

      const collateralBalance = (await mockUSDC.read.balanceOf([
        collateralManager.address,
      ])) as bigint;

      expect(collateralUSDC).to.eql(collateralAmount);
      expect(ownerBalanceBefore - ownerBalanceAfter).to.eql(collateralAmount);
      expect(collateralBalance).to.eql(collateralAmount);
    });

    it("create listing usdc monthly", async () => {
      const {
        mockUSDC,
        manager,
        collateralManager,
        landlord,
        landlordAddress,
      } = await loadFixture(systemDeployFixture);

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;

      const ownerBalanceBefore = (await mockUSDC.read.balanceOf([
        landlordAddress,
      ])) as bigint;

      const listingData = getCreateListingManagerData(
        propertyID,
        undefined,
        PaymentType.Monthly
      );
      const collateralPercent = 5000n;
      const priceDenominator = 10000n;
      const collateralAmount =
        (listingData.price * collateralPercent) / priceDenominator;

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const collateralUSDC = (await collateralManager.read.getCollateralUSDC([
        landlordAddress,
        propertyID,
      ])) as bigint;

      const ownerBalanceAfter = (await mockUSDC.read.balanceOf([
        landlordAddress,
      ])) as bigint;

      const collateralBalance = (await mockUSDC.read.balanceOf([
        collateralManager.address,
      ])) as bigint;

      expect(collateralUSDC).to.eql(collateralAmount);
      expect(ownerBalanceBefore - ownerBalanceAfter).to.eql(collateralAmount);
      expect(collateralBalance).to.eql(collateralAmount);
    });
  });

  describe("createListingETH", () => {
    it("create listing eth weekly", async () => {
      const { manager, collateralManager } =
        await loadFixture(systemDeployFixture);

      const [, landlord] = await hre.viem.getWalletClients();
      const landlordAddress = landlord.account.address;

      const propertyData = getPropertyData(landlordAddress);
      const feeAmount = await manager.read.calculatePriceEth([fees.feeAmount]);
      const addProperty = await manager.write.addPropertyETH(
        Object.values(propertyData),
        { value: feeAmount }
      );
      const propertyID = (await getAddPropertyReturnValue(
        addProperty,
        0
      )) as `0x${string}`;

      const price: bigint = parseEther("5000");
      const listingData = getCreateListingManagerData(
        propertyID,
        price,
        PaymentType.Weekly
      );

      const collateralAmount = price;
      const ethAmount = await manager.read.calculatePriceEth([
        collateralAmount,
      ]);

      await manager.write.createListingETH(Object.values(listingData), {
        value: ethAmount,
        account: landlord.account,
      });

      const collateralETH = (await collateralManager.read.getCollateralETH([
        landlordAddress,
        propertyID,
      ])) as bigint;

      expect(collateralETH).to.eql(ethAmount);
    });

    it("create listing eth monthly", async () => {
      const { manager, collateralManager } =
        await loadFixture(systemDeployFixture);

      const [, landlord] = await hre.viem.getWalletClients();
      const landlordAddress = landlord.account.address;

      const propertyData = getPropertyData(landlordAddress);
      const feeAmount = await manager.read.calculatePriceEth([fees.feeAmount]);
      const addProperty = await manager.write.addPropertyETH(
        Object.values(propertyData),
        { value: feeAmount }
      );
      const propertyID = (await getAddPropertyReturnValue(
        addProperty,
        0
      )) as `0x${string}`;

      const price: bigint = parseEther("5000");
      const listingData = getCreateListingManagerData(
        propertyID,
        price,
        PaymentType.Monthly
      );

      const collateralAmount = (price * 5000n) / 10000n;
      const ethAmount = await manager.read.calculatePriceEth([
        collateralAmount,
      ]);

      await manager.write.createListingETH(Object.values(listingData), {
        value: ethAmount,
        account: landlord.account,
      });

      const collateralETH = (await collateralManager.read.getCollateralETH([
        landlordAddress,
        propertyID,
      ])) as bigint;

      expect(collateralETH).to.eql(ethAmount);
    });
  });

  describe("acceptListing", () => {
    it("successfully accepts listing", async () => {
      const {
        mockUSDC,
        manager,
        collateralManager,
        landlord,
        landlordAddress,
        tenant,
        tenantAddress
      } = await loadFixture(systemDeployFixture);

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);
      const collateralAmount = listingData.price;

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })
    });
  });

  describe("signAgreement", () => {
    it("should create a new agreement", async () => {
      const { broker, manager, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);
      const collateralAmount = listingData.price;

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);
    });
  });

  describe("startRent", () => {
    it("should start a new rent", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData: AcceptListingStruct = await getAcceptListingData(propertyID) as AcceptListingStruct;

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });

      const paymentsExpected: PaymentScheduleDataStruct = await getPaymentScheduleData(landlordAddress, tenantAddress, acceptListingData, 3n, 4n);

      const payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      comparePaymentScheduledata(paymentsExpected, payments)
    });
  });

  describe("payRent", () => {
    it("should pay scheduled rent", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });
      const payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payRent([propertyID], {
        account: tenant.account
      });
    });

    it("should pay scheduled rent 3 more time", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });

      let payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payRent([propertyID], {
        account: tenant.account
      });

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payRent([propertyID], {
        account: tenant.account
      });

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payRent([propertyID], {
        account: tenant.account
      });

      const errorMsg = `An unknown RPC error occurred.\n\nRequest Arguments:\n  from:  ${'0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc'}\n  to:    ${'0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'}\n  data:  0xc7e9bd6af3050c2e26ca09d4f5e7f6f58789a5bbeaa534cd3b751d76c0cbe11a0c53e56b\n\nDetails: VM Exception while processing transaction: reverted with custom error 'PaymentScheduleFinished()'\nVersion: viem@1.18.7`

      try {
        await manager.write.payRent([propertyID], {
          account: tenant.account
        });
      } catch (error: any) {
        expect(error.message).to.be.eq(errorMsg);
      }
    });

    it("should pay full rent", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });

      let payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payFullRent([propertyID], {
        account: tenant.account
      });

      const paymentsExpected: PaymentScheduleDataStruct = await getPaymentScheduleData(landlordAddress, tenantAddress, acceptListingData, 0n, 4n, undefined, undefined, true);

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      comparePaymentScheduledata(paymentsExpected, payments);

      const errorMsg = `An unknown RPC error occurred.\n\nRequest Arguments:\n  from:  ${'0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc'}\n  to:    ${'0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'}\n  data:  0xadf732b2f3050c2e26ca09d4f5e7f6f58789a5bbeaa534cd3b751d76c0cbe11a0c53e56b\n\nDetails: VM Exception while processing transaction: reverted with custom error 'PaymentScheduleFinished()'\nVersion: viem@1.18.7`

      try {
        await manager.write.payFullRent([propertyID], {
          account: tenant.account
        });
      } catch (error: any) {
        expect(error.message).to.be.eq(errorMsg);
      }
    });
  });

  describe("receiveFunds", () => {
    it("should receive funds", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });
      let payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payRent([propertyID], {
        account: tenant.account
      });

      const landlordBalanceBefore: bigint = await mockUSDC.read.balanceOf([landlordAddress]) as bigint;

      await manager.write.receiveFunds([propertyID], {
        account: landlord.account
      });

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      const paymentsExpected: PaymentScheduleDataStruct = await getPaymentScheduleData(landlordAddress, tenantAddress, acceptListingData, 2n, 3n, undefined, undefined, false);

      comparePaymentScheduledata(paymentsExpected, payments);

      const landlordBalance = await mockUSDC.read.balanceOf([landlordAddress])

      expect(landlordBalance).to.be.eq(landlordBalanceBefore + payments.price);
    });

    it("should receive full rent", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });

      let payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payFullRent([propertyID], {
        account: tenant.account
      });

      await manager.write.receiveFunds([propertyID], {
        account: landlord.account
      });

      await manager.write.receiveFunds([propertyID], {
        account: landlord.account
      });

      await manager.write.receiveFunds([propertyID], {
        account: landlord.account
      });

      await manager.write.receiveFunds([propertyID], {
        account: landlord.account
      });

      const paymentsExpected: PaymentScheduleDataStruct = await getPaymentScheduleData(landlordAddress, tenantAddress, acceptListingData, 0n, 0n, undefined, undefined, true);

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      comparePaymentScheduledata(paymentsExpected, payments);

      const errorMsg = `An unknown RPC error occurred.\n\nRequest Arguments:\n  from:  ${'0x70997970c51812dc3a010c7d01b50e0d17dc79c8'}\n  to:    ${'0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'}\n  data:  0x9548f3e5f3050c2e26ca09d4f5e7f6f58789a5bbeaa534cd3b751d76c0cbe11a0c53e56b\n\nDetails: VM Exception while processing transaction: reverted with custom error 'PaymentWithdrawalFinished()'\nVersion: viem@1.18.7`

      try {
        await manager.write.receiveFunds([propertyID], {
          account: landlord.account
        });
      } catch (error: any) {
        expect(error.message).to.be.eq(errorMsg);
      }
    });

    it("should receive full rent from full payment", async () => {
      const { broker, manager, intermediary, collateralManager, landlord, landlordAddress, tenant, tenantAddress, mockUSDC } = await loadFixture(
        systemDeployFixture
      );

      const propertyData = getPropertyData(landlordAddress);
      const tx = await manager.write.addPropertyUSDC(
        Object.values(propertyData),
        { account: landlord.account }
      );
      const propertyID = (await getAddPropertyReturnValue(
        tx,
        1
      )) as `0x${string}`;
      const listingData = getCreateListingManagerData(propertyID);

      await mockUSDC.write.approve(
        [collateralManager.address, listingData.price],
        { account: landlord.account }
      );
      await manager.write.createListingUSDC(Object.values(listingData), {
        account: landlord.account,
      });

      const acceptListingData = await getAcceptListingData(propertyID);

      await manager.write.acceptListing(Object.values(acceptListingData), {
        account: tenant.account
      })

      const client = getTestClient();
      const chainId = await client.getChainId();

      const domain = {
        name: "Agreement",
        version: "1",
        chainId,
        verifyingContract: broker.address,
      } as const;

      const types = {
        SigningData: [
          { name: "propertyID", type: "bytes32" },
          { name: "location", type: "string" },
          { name: "landlord", type: "address" },
          { name: "tenant", type: "address" },
          { name: "isNative", type: "bool" },
          { name: "price", type: "uint256" },
          { name: "rentStart", type: "uint256" },
          { name: "rentFinish", type: "uint256" },
          { name: "agreementTimestamp", type: "uint256" },
        ],
      } as const;

      const signingData = await broker.read.getAgreementSigningData([propertyID]) as SigningDataStruct;

      const signatureByLandlord = await client.signTypedData({
        account: landlord.account,
        domain,
        types,
        primaryType: "SigningData",
        message: {
          ...signingData
        },
      });

      await manager.write.signAgreement([propertyID, signatureByLandlord]);

      await manager.write.startRent([propertyID], {
        account: tenant.account
      });

      let payments: PaymentScheduleDataStruct = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;
      await time.increaseTo(payments.lastPayment + (ONE_DAY * 7n));

      await manager.write.payFullRent([propertyID], {
        account: tenant.account
      });

      await manager.write.receiveFullFunds([propertyID], {
        account: landlord.account
      });

      const paymentsExpected: PaymentScheduleDataStruct = await getPaymentScheduleData(landlordAddress, tenantAddress, acceptListingData, 0n, 0n, undefined, undefined, true);

      payments = await intermediary.read.getPayments([propertyID]) as PaymentScheduleDataStruct;

      comparePaymentScheduledata(paymentsExpected, payments);

      const errorMsg = `An unknown RPC error occurred.\n\nRequest Arguments:\n  from:  ${'0x70997970c51812dc3a010c7d01b50e0d17dc79c8'}\n  to:    ${'0x5fc8d32690cc91d4c39d9d3abcbd16989f875707'}\n  data:  0x9548f3e5f3050c2e26ca09d4f5e7f6f58789a5bbeaa534cd3b751d76c0cbe11a0c53e56b\n\nDetails: VM Exception while processing transaction: reverted with custom error 'PaymentWithdrawalFinished()'\nVersion: viem@1.18.7`

      try {
        await manager.write.receiveFunds([propertyID], {
          account: landlord.account
        });
      } catch (error: any) {
        expect(error.message).to.be.eq(errorMsg);
      }
    });
  });
});

