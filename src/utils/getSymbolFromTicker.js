// utils/getSymbolFromTicker.js

const tickerToSymbolMapping = {
  ETH_MAINNET: "ETH",
  BNB_MAINNET: "BNB",
  MATIC_MAINNET: "POL",
  AVAX_MAINNET: "AVAX",
  ETH_ARBITRUM: "ETH",
  ETH_OPTIMISM: "ETH",
  ETH_SEPOLIA: "ETH", // Can be "SepoliaETH" if needed
  MATIC_AMOY: "POL",
  AVAX_FUJI: "AVAX",
  BNB_TESTNET: "BNB",
  ETH_OP_SEPOLIA: "ETH",
  SOL_MAINNET: "SOL",
  SOL_DEVNET: "SOL",
};

const getSymbolFromTicker = (ticker) => {
  return tickerToSymbolMapping[ticker] || ticker; // Default to ticker if not found
};

export default getSymbolFromTicker;
