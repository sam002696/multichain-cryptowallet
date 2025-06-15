import { ethers } from "ethers";
import { Connection } from "@solana/web3.js";

const INFURA_KEY = "75573f1a11f84a848d4e7292fe2fb5b9";

export const providers = {
  // EVM Networks
  1: new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_KEY}`), // Ethereum Mainnet
  137: new ethers.JsonRpcProvider(
    `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`
  ), // Polygon Mainnet
  43114: new ethers.JsonRpcProvider(
    `https://avalanche-mainnet.infura.io/v3/${INFURA_KEY}`
  ), // Avalanche C-Chain
  11155111: new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_KEY}`
  ), // Ethereum Sepolia
  80002: new ethers.JsonRpcProvider(
    `https://polygon-amoy.infura.io/v3/${INFURA_KEY}`
  ), // Polygon Amoy
  11155420: new ethers.JsonRpcProvider(
    `https://optimism-sepolia.infura.io/v3/${INFURA_KEY}`
  ), // Optimism Sepolia
  43113: new ethers.JsonRpcProvider(
    `https://avalanche-fuji.infura.io/v3/${INFURA_KEY}`
  ), // Avalanche Fuji
  97: new ethers.JsonRpcProvider(
    `https://bsc-testnet.infura.io/v3/${INFURA_KEY}`
  ), // BSC Testnet (custom RPC, Infura doesn't support this officially)

  // Solana Networks
  "Devnet SOL": new Connection(
    "https://rpc.ankr.com/solana_devnet/b21ae3676da2ebb41647a16dadb8ab0abb14e8ed9509d4082051f094f50cc312",
    "confirmed"
  ),

  // If you need Solana Mainnet:
  // "Mainnet SOL": new Connection(
  //   "https://api.mainnet-beta.solana.com",
  //   "confirmed"
  // ),
};
