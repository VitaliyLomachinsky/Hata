import hre from "hardhat";
import { verifyContract } from '../helpers/verifyContract';
import {
	fees
} from "../../test/helpers/constants";

const DATA_STREAM_ADDRESS = '0xf8c08bDC961DE7D0C2185c4d25C9e95829ffeE65'
const USDC_ADDRESS = '0xf8c08bDC961DE7D0C2185c4d25C9e95829ffeE65'
const MANAGER_ADDRESS = '0x1c61cc004abee79990e2373f908d4aae6c0f69e1';
const REGISTRY_ADDRESS = '0x4a2af1bb289d2943c7ec620d380b262aae4351fc';
const MARKETPLACE_ADDRESS = '0xc4860770331bdd2aa905613702a6b2f1e3f2355e';
const BROKER_ADDRESS = '0x4b7920b017e732cff4753bdd5714404c4ab39553';
const AGREEMENT_TOKEN_ADDRESS = '0xac79909f8c3ac72201c0f877d536969db8da1600';
const COLLATERAL_MANAGER_ADDRESS = '0x751f8a28e4d37316a91bc503b0ee9061b9d959a2';
const INTERMEDIARY_ADDRESS = '0x8eb56bb4900ee63c33a021868ae7d5b313251133';

async function main(): Promise<void> {
	const [deployer] = await hre.viem.getWalletClients();
	const deployerAddress = deployer.account.address;

	// await verifyContract(DATA_STREAM_ADDRESS);
	// await verifyContract(USDC_ADDRESS);
	await verifyContract(MANAGER_ADDRESS, [deployer.account.address, USDC_ADDRESS, DATA_STREAM_ADDRESS, fees]);
	await verifyContract(REGISTRY_ADDRESS, [MANAGER_ADDRESS]);
	await verifyContract(MARKETPLACE_ADDRESS, [MANAGER_ADDRESS, REGISTRY_ADDRESS]);
	await verifyContract(BROKER_ADDRESS, [MANAGER_ADDRESS]);
	await verifyContract(AGREEMENT_TOKEN_ADDRESS, [BROKER_ADDRESS]);
	await verifyContract(COLLATERAL_MANAGER_ADDRESS, [MANAGER_ADDRESS, USDC_ADDRESS]);
	await verifyContract(INTERMEDIARY_ADDRESS, [MANAGER_ADDRESS, USDC_ADDRESS]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error: Error) => {
		console.error(error);
		process.exit(1);
	});
