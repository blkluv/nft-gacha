import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    // goerli: {
    //   url: GOERLI_API,
    //   accounts: [ACCOUNT]
    // }
  },
  // etherscan: {
  //   apiKey: ETHERSCAN_API_KEY
  // }
};

export default config;
