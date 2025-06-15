import { ethers } from "ethers";
import { WalletKey } from "../helpers/WalletKey";
import { providers } from "./providers";

export async function getBalanceForNetwork(n) {
  try {
    const address = WalletKey.getEthereumPublicAddress();

    // Use existing provider if available
    let provider = providers[n.chainId];

    // Fallback: create a new one from network config
    if (!provider && n.rpc) {
      const rpcUrl = Array.isArray(n.rpc) ? n.rpc[0] : n.rpc;
      provider = new ethers.JsonRpcProvider(rpcUrl);
    }

    if (!provider) {
      throw new Error(`No provider found for chainId: ${n.chainId}`);
    }

    const balanceBigInt = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balanceBigInt);

    return balanceInEth;
  } catch (error) {
    console.error(`Failed to fetch balance for ${n.name}:`, error);
    return "0";
  }
}
