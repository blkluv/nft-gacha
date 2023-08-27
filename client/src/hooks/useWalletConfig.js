import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import { sepolia, localhost, mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const useWalletConfig = () => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      localhost,
      mainnet,
      polygon,
      ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
    ],
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet({ projectId: "FGO Lootbox System", chains })],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  return {
    chains,
    wagmiConfig,
  };
};
