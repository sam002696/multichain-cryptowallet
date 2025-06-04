class WalletKeyHelper {
  setEthereum(key) {
    localStorage.setItem("ethereumKey", JSON.stringify(key));
  }

  setSolanaKey(key) {
    localStorage.setItem("solanaKey", JSON.stringify(key));
  }

  getSolanaKey() {
    const key = JSON.parse(localStorage.getItem("solanaKey")) || null;
    return key;
  }

  getEhereumTicker() {
    const ticker = "ETH_MAINNET";
    return ticker;
  }

  getEhereumRpcUrl() {
    const address = `https://mainnet.infura.io/v3/75573f1a11f84a848d4e7292fe2fb5b9`;
    return address;
  }

  getEthereumPublicAddress() {
    const rpcUrl = JSON.parse(localStorage.getItem("ethereumKey")) || null;
    return rpcUrl?.address;
  }
}

export const WalletKey = new WalletKeyHelper();
