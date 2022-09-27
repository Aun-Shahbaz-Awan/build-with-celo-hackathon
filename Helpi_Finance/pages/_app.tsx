import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// ------------------------- custom chains --------------->>>
const celoAlfajoresChain = {
  id: 44787,
  name: "Celo (Alfajores Testnet)",
  network: "celo",
  iconUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/5567.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Alfajores",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://alfajores-forno.celo-testnet.org",
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://alfajores-blockscout.celo-testnet.org",
    },
  },
  testnet: true,
};
// ------------------------- custom chains ---------------<<<

const { chains, provider, webSocketProvider } = configureChains(
  [
    celoAlfajoresChain,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
    }),
    publicProvider(),
  ]
);


const { connectors } = getDefaultWallets({
  appName: 'Helpi Finance',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
