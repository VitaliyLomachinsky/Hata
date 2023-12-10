import { formatEther, parseEther } from "viem";
import hre from "hardhat";

const MANAGER_ADDRESS = ''
const REGISTRY_ADDRESS = '0x0a9dac3ec44cf79e7a26710a8513557966279270'

async function main() {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  // ! change deployerAddress to Manager address
  const marketplace = await hre.viem.deployContract("Marketplace", [deployerAddress, REGISTRY_ADDRESS]);
  console.log(
    `Marketplace deployed to ${marketplace.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
