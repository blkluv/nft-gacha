import { ethers, JsonRpcProvider } from 'ethers';
import { SaintQuartz__factory } from "../../typechain/factories/contracts";

const saintQuartzAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const providerUrl = "http://localhost:8545";

export const useNetwork = () => {
  async function connectSaintQuartz() {
    const newProvider = new JsonRpcProvider(providerUrl) as any;
    const newSaintQuartzContract = await SaintQuartz__factory.connect(saintQuartzAddress, newProvider);
    return newSaintQuartzContract;
  }

  const getSigner = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    return signer;
  };

  return {
    getSigner,
    connectSaintQuartz,
  };
};
