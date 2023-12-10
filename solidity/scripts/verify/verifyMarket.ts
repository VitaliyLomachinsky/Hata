import hre from "hardhat";
import { verifyContract } from '../helpers/verifyContract';

const REGISTRY_ADDRESS = '0x0a9dac3ec44cf79e7a26710a8513557966279270'
const market_address = '0xf7c4cd5ca0e2ab2609688b2662a35aa24e7f93eb';

async function main(): Promise<void> {
  const [deployer] = await hre.viem.getWalletClients();
  const deployerAddress = deployer.account.address;

  await verifyContract(market_address, [deployerAddress, REGISTRY_ADDRESS]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
