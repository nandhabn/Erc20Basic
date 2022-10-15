import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const mnemonic = process.env.MNEMONIC;
const sepoliaUrl = process.env.SEPOLIA_URL;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: sepoliaUrl,
      accounts: { mnemonic: mnemonic, count: 1 },
      chainId: 11155111,
    },
  },
};

export default config;
