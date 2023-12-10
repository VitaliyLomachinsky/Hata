import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddPropertyReturnValue } from "./helpers/utils";
import {
  fees,
  getAcceptListingData,
  getAcceptMarketplaceListingData,
  getCreateListingData,
  getPropertyData,
  getSigningData,
} from "./helpers/constants";
import { parseEther } from "viem";

// NOTICE: MOCK FIXTURES ARE THE ONES THAT ARE USED IN SEPARATE .SPEC.TS FILES

export const systemDeployFixture = async () => {
  const [owner, landlord, tenant] = await hre.viem.getWalletClients();
  const ownerAddress = owner.account.address;
  const landlordAddress = landlord.account.address;
  const tenantAddress = tenant.account.address;

  const mockDataStream = await hre.viem.deployContract("DataStreamMock");
  const mockUSDC = await hre.viem.deployContract("USDCMock");
  await mockUSDC.write.mint([ownerAddress, parseEther("5000")]);
  await mockUSDC.write.mint([landlordAddress, parseEther("5000")]);
  await mockUSDC.write.mint([tenantAddress, parseEther("5000")]);

  const manager = await hre.viem.deployContract("Manager", [
    ownerAddress,
    mockUSDC.address,
    mockDataStream.address,
    fees,
  ]);
  await mockUSDC.write.approve([manager.address, parseEther("50000")]);
  await mockUSDC.write.approve([manager.address, parseEther("50000")], {
    account: landlord.account,
  });

  const registry = await hre.viem.deployContract("Registry", [manager.address]);
  const marketplace = await hre.viem.deployContract("Marketplace", [
    manager.address,
    registry.address,
  ]);
  const broker = await hre.viem.deployContract("Broker", [manager.address]);
  const agreementToken = await hre.viem.deployContract("AgreementToken", [
    broker.address,
  ]);
  await broker.write.initialize([agreementToken.address])

  const collateralManager = await hre.viem.deployContract("CollateralManager", [
    manager.address,
    mockUSDC.address,
  ]);
  const intermediary = await hre.viem.deployContract("Intermediary", [
    manager.address,
    mockUSDC.address,
  ]);
  await mockUSDC.write.approve([intermediary.address, parseEther("50000")], {
    account: tenant.account,
  });


  await manager.write.initialize([
    registry.address,
    marketplace.address,
    broker.address,
    collateralManager.address,
    intermediary.address,
  ]);

  return {
    mockUSDC,
    mockDataStream,
    manager,
    registry,
    marketplace,
    broker,
    agreementToken,
    collateralManager,
    intermediary,
    owner,
    ownerAddress,
    landlord,
    landlordAddress,
    tenant,
    tenantAddress
  };
};

export const deployPropertyRegistryMockFixture = async () => {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  const propertyRegistry = await hre.viem.deployContract("Registry", [
    deployerAddress,
  ]);

  const propertyData = getPropertyData(deployerAddress);

  return {
    propertyRegistry,
    propertyData,
  };
};

export const deployMarketplaceMockFixture = async () => {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  const { propertyRegistry, propertyData } = await loadFixture(
    deployPropertyRegistryMockFixture
  );

  const tx = await propertyRegistry.write.addProperty(
    Object.values(propertyData)
  );

  const propertyID = (await getAddPropertyReturnValue(tx, 0)) as `0x${string}`;

  const createListingData = getCreateListingData(propertyID);
  const acceptListingData = await getAcceptMarketplaceListingData(propertyID);

  const marketplace = await hre.viem.deployContract("Marketplace", [
    deployerAddress,
    propertyRegistry.address,
  ]);

  return {
    marketplace,
    createListingData,
    acceptListingData,
    propertyData,
    propertyID,
  };
};

export const deployBrokerMockFixture = async () => {
  const [deployer, landlord, tenant] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;
  const landlordAddress = landlord.account.address;
  const tenantAddress = tenant.account.address;

  const { createListingData, acceptListingData, propertyID } =
    await loadFixture(deployMarketplaceMockFixture);

  const broker = await hre.viem.deployContract("Broker", [deployerAddress]);
  const agreementToken = await hre.viem.deployContract("AgreementToken", [
    broker.address,
  ]);
  await broker.write.initialize([agreementToken.address])

  return {
    broker,
    deployer,
    landlord,
    landlordAddress,
    tenant,
    tenantAddress,
    createListingData,
    acceptListingData,
    propertyID,
  };
};

export const deployAgreementTokenMockFixture = async () => {
  const [owner] = await hre.viem.getWalletClients();

  const token = await hre.viem.deployContract("AgreementToken", [
    owner.account.address,
  ]);

  return {
    token,
    owner,
  };
};

export const deployDataStreamFixture = async () => {
  const [owner] = await hre.viem.getWalletClients();

  const dataStreamAddress = '0xadB3Bd81BE72479E13f038CDD9c4CA0c7E2357Fc';
  const emmiterAddress = '0xCa673987F1D74552fC25Dd7975848FE6f5F21abC';

  const dataStream = await hre.viem.getContractAt("ETHUSDPriceDataStream", dataStreamAddress);
  const emmiter = await hre.viem.getContractAt("LogEmitter", emmiterAddress);

  return {
    dataStream,
    emmiter,
    owner
  };
};
