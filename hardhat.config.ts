import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  typechain: {
    outDir: "./client/typechain",
    target: "ethers-v5",
  },
};

export default config;
