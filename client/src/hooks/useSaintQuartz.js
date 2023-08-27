import { useNetwork } from "./useNetwork";
import { ethers } from "ethers";

export const useSaintQuartz = () => {
  const { saintQuartzContract } = useNetwork();

  const getSigner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  };

  const fetchSqAmount = async () => {
    try {
      if(saintQuartzContract) {
        const signer = await getSigner();
        const amount = await saintQuartzContract.connect(signer).getSaintQuartzBalance();
        return parseInt(amount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchSqAmount,
  };
};
