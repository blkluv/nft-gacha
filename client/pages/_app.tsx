import Head from 'next/head';
import { AppProps } from 'next/app';
import dynamic from "next/dynamic";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../src/utils/createEmotionCache';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { useWalletConfig } from "../src/hooks/useWalletConfig";
import theme from '../src/utils/theme';
import Layout from './_layout';
import { NetworkContext } from '../src/utils/contexts';
import { useNetwork } from '../src/hooks/useNetwork';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  // Client-side cache, shared for the whole session of the user in the browser.
  const clientSideEmotionCache = createEmotionCache();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { chains, wagmiConfig } = useWalletConfig();
  const network = useNetwork();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider modalSize="compact" chains={chains} theme={darkTheme()}>
            <NetworkContext.Provider value={network}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </NetworkContext.Provider>
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
