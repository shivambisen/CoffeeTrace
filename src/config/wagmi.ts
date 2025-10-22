import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'
import { polygonAmoy } from './chains'

export const config = createConfig({
  chains: [polygonAmoy, mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID || '' }),
  ],
  transports: {
    [polygonAmoy.id]: http('https://polygon-amoy.drpc.org'),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
