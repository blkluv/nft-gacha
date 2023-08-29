import { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import { SaintQuartz__factory } from "../../typechain/factories/contracts";

const saintQuartzAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const providerUrl = "http://localhost:8545";

export const useNetwork = () => {
  const [saintQuartzContract, setSaintQuartzContract] = useState({});

  async function connectNetwork() {
    const newProvider = new JsonRpcProvider(providerUrl);
    const newSaintQuartzContract = await SaintQuartz__factory.connect(saintQuartzAddress, newProvider);
    setSaintQuartzContract(newSaintQuartzContract);
  }

  useEffect(() => {
      connectNetwork();
  }, []);

  return {
    saintQuartzContract,
  };
};
