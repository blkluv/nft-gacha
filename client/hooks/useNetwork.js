import { useState, useEffect } from 'react';
import { JsonRpcProvider } from 'ethers';
import {SaintQuartz__factory} from "../typechain/factories/contracts";

const saintQuartzAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const providerUrl = "http://localhost:8545";

export const useNetwork = () => {
  const [saintQuartzContract, setSaintQuartzContract] = useState(null);

  function connectNetwork() {
    const newProvider = new JsonRpcProvider(providerUrl);
    const newSaintQuartzContract = SaintQuartz__factory.connect(saintQuartzAddress, newProvider);
    setSaintQuartzContract(newSaintQuartzContract);
  }

  useEffect(() => {
      connectNetwork();
  }, []);

  return {
    saintQuartzContract
  };
};
