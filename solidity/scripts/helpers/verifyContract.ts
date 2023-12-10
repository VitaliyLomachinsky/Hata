import hre from 'hardhat';

export const verifyContract = async (address: string, constructorArguments: Array<unknown> = []): Promise<void> => {
	console.log(`Trying to verifying ${address}\n`);
	try {
		await hre.run('verify:verify', {
			address,
			constructorArguments,
		});
		console.log('Successfully verified!');
	} catch (err) {
		console.log('Verification failed!!!');
		ignoreAlreadyVerifiedError(err);
	}
};


const ignoreAlreadyVerifiedError = (err: Error): void => {
	if (err.message.includes('Already Verified')) {
		console.log('Contract already verified, skipping');

		return;
	} else {
		throw err;
	}
};
