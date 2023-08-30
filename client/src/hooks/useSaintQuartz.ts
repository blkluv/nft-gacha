import { useNetwork } from "./useNetwork";

export const useSaintQuartz = () => {
  const { getSigner, connectSaintQuartz } = useNetwork();

  const fetchSqAmount = async () => {
    try {
      const signer = await getSigner();
      const contract = await connectSaintQuartz();
      const amount = await contract.connect(signer).getSaintQuartzBalance();
      return parseInt(amount);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSqPackages = async () => {
    try {
      const contract = await connectSaintQuartz();
      const packages = await contract.getSqPackages();
      return packages;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchSqAmount,
    fetchSqPackages,
  };
};
