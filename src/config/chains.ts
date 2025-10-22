import { defineChain } from 'viem'

export const polygonAmoy = defineChain({
  id: 80002,
  name: 'Polygon Amoy',
  network: 'polygon-amoy',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: ['wss://polygon-amoy-bor-rpc.publicnode.com'],
    },
    public: {
      http: ['wss://polygon-amoy-bor-rpc.publicnode.com'],
    },
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://amoy.polygonscan.com' },
  },
  testnet: true,
})
