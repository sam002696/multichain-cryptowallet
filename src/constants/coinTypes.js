// src/constants/coinTypes.js

export const coinTypes = {
  ethereum: {
    path: 60,
    chainId: 1,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
  },
  bsc: {
    path: 60,
    chainId: 56,
    nativeCurrency: { name: "Binance Coin", symbol: "BNB", decimals: 18 },
    rpcUrl: "https://bsc-dataseed.binance.org/",
  },
  polygon: {
    path: 60,
    chainId: 137,
    nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
    rpcUrl: "https://polygon-rpc.com/",
  },
  avalanche: {
    path: 60,
    chainId: 43114,
    nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  },
  arbitrum: {
    path: 60,
    chainId: 42161,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  optimism: {
    path: 60,
    chainId: 10,
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: "https://mainnet.optimism.io",
  },
  // bitcoin and cosmos are commented out, but you can add them if needed:
  // bitcoin: {
  //   path: 0,
  //   chainId: null,
  //   nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
  //   rpcUrl: "https://blockstream.info/api/",
  // },
  // cosmos: {
  //   path: 118,
  //   chainId: null,
  //   nativeCurrency: { name: "ATOM", symbol: "ATOM", decimals: 6 },
  //   rpcUrl: "https://cosmos-rpc.publicnode.com",
  // },
  solana: {
    path: 501,
    chainId: "Mainnet Beta",
    nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
    rpcUrl: "https://api.mainnet-beta.solana.com",
  },
};
