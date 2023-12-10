import hre from "hardhat";
import {
  fees
} from "../../test/helpers/constants";
import { parseEther } from "viem";

const DATASTREAM_ADDRESS = '0xf8c08bDC961DE7D0C2185c4d25C9e95829ffeE65'
const USDCMOCK_ADDRESS = '0x19d1bdd343c3ecdeb168d09573e5248b5f824e0e'

async function main() {
  const [owner] = await hre.viem.getWalletClients();
  const ownerAddress = owner.account.address;

  // const dataStream = await hre.viem.deployContract("StreamsLookupChainlinkAutomation");
  // console.log("DataStream: ", dataStream.address);

  // const mockUSDC = await hre.viem.deployContract("USDCMock");
  // console.log("USDC: ", mockUSDC.address);
  // await mockUSDC.write.mint([ownerAddress, parseEther("5000")]);
  // await mockUSDC.write.mint(['0x97d34c151214875fa2c42e6a7D54ff8E967FA208', parseEther("5000")]);

  const manager = await hre.viem.deployContract("Manager", [
    ownerAddress,
    USDCMOCK_ADDRESS,
    DATASTREAM_ADDRESS,
    fees,
  ]);
  console.log("Manager: ", manager.address);
  // await mockUSDC.write.approve([manager.address, parseEther("50000")]);

  const registry = await hre.viem.deployContract("Registry", [manager.address]);
  console.log("Registry: ", registry.address);

  const marketplace = await hre.viem.deployContract("Marketplace", [
    manager.address,
    registry.address,
  ]);
  console.log("Marketplace: ", marketplace.address);

  const broker = await hre.viem.deployContract("Broker", [manager.address]);
  console.log("Broker: ", broker.address);

  const agreementToken = await hre.viem.deployContract("AgreementToken", [
    broker.address,
  ]);
  console.log("AgreementToken: ", agreementToken.address);
  await broker.write.initialize([agreementToken.address])

  const collateralManager = await hre.viem.deployContract("CollateralManager", [
    manager.address,
    USDCMOCK_ADDRESS,
  ]);
  console.log("CollateralManager: ", collateralManager.address);

  const intermediary = await hre.viem.deployContract("Intermediary", [
    manager.address,
    USDCMOCK_ADDRESS,
  ]);
  console.log("Intermediary: ", intermediary.address);

  await manager.write.initialize([
    registry.address,
    marketplace.address,
    broker.address,
    collateralManager.address,
    intermediary.address,
  ]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
