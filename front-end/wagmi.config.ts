import { defineConfig } from "@wagmi/cli";
import { react, hardhat } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    react(),
    hardhat({
      artifacts: "../build",
      project: "../solidity/contracts/",
      exclude: ["@openzeppelin/**"]
    }),
  ],
});
