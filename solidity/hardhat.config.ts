import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from 'dotenv';
dotenv.config();

const privateKey = process.env.PRIVATE_KEY || '';

const arbitrumKey = process.env.ARBITRUM_SEPOLIA_KEY;
const arbiscanKey = process.env.ARBISCAN_KEY || '';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      // forking: {
      //   url: `https://arb-mainnet.g.alchemy.com/v2/${rpc_key}`,
      // },
      chainId: 31337,
      allowUnlimitedContractSize: true,
      // forking: {
      //   url: `https://soft-hidden-grass.arbitrum-sepolia.quiknode.pro/${arbitrumKey}/`,
      //   blockNumber: 1617249
      // }
    },
    arbitrum_sepolia: {
      url: `https://soft-hidden-grass.arbitrum-sepolia.quiknode.pro/${arbitrumKey}/`,
      chainId: 421614,
      accounts: [privateKey],
    }
  },
  paths: {
    artifacts: "./build"
  },
  gasReporter: {
    enabled: false
  },
  etherscan: {
    apiKey: {
      arbitrum_sepolia: arbiscanKey
    },
    customChains: [
      {
        network: "arbitrum_sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/"
        }
      }
    ]
  }
};

export default config;
