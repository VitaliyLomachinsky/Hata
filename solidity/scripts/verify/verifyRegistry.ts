import hre from "hardhat";
import { verifyContract } from '../helpers/verifyContract';

const registry_address = '0x0a9dac3ec44cf79e7a26710a8513557966279270';

async function main(): Promise<void> {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  await verifyContract(registry_address, [deployerAddress]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
