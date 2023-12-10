import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  // ! change deployerAddress to Manager address
  const propertyRegistry = await hre.viem.deployContract("Registry", [
    deployerAddress,
  ]);

  console.log(
    `Registry deployed to ${propertyRegistry.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
