import { WagmiConfig, createConfig, configureChains } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { mainnet, hardhat, arbitrumSepolia } from 'wagmi/chains'

import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, hardhat, arbitrumSepolia],
  [alchemyProvider({ apiKey: ALCHEMY_KEY! }), publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  ],
  publicClient,
  webSocketPublicClient,
});

export default config;
