import { createContext, useContext, useEffect, useState } from "react";
import { getFromDatabase } from "../utils/AuthUtility/indexedDB";
import {
  generateKeyFromPassword,
  decryptData,
} from "../utils/AuthUtility/cryptoUtils";

import { WalletKey } from "../helpers/WalletKey";
import { useLoading } from "./LoadingContext";

// import { useLoading } from "./LoadingContext";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { setIsLoading } = useLoading();

  const checkRegistration = async () => {
    const walletData = await getFromDatabase(
      "WalletDB",
      "walletStore",
      "walletData"
    );
    return !!walletData;
  };

  const sessionIsValid = () => {
    const sessionToken = localStorage.getItem("sessionToken");
    const sessionExpiry = localStorage.getItem("sessionExpiry");
    return (
      sessionToken && sessionExpiry && Date.now() < parseInt(sessionExpiry, 10)
    );
  };

  const decryptAndStoreKeys = async (password) => {
    try {
      const walletData = await getFromDatabase(
        "WalletDB",
        "walletStore",
        "walletData"
      );
      if (!walletData || !walletData.keys) {
        console.error("No wallet data found in IndexedDB.");
        return;
      }
      const encryptionKey = await generateKeyFromPassword(password);
      const decryptedKeys = await Promise.all(
        walletData.keys.map(async (key) => {
          try {
            if (
              !key.privateKey ||
              !key.privateKey.encrypted ||
              !key.privateKey.iv
            ) {
              console.warn("Skipping malformed key:", key);
              return null;
            }
            return {
              chain: key.chain,
              chainId: key.chainId,
              nativeCurrency: key.nativeCurrency,
              rpcUrl: key.rpcUrl,
              address: key.address,
              privateKey: await decryptData(
                encryptionKey,
                key.privateKey.encrypted,
                key.privateKey.iv
              ),
            };
          } catch (error) {
            console.error(
              `Error decrypting key for chain ${key.chain}:`,
              error
            );
            return null;
          }
        })
      );
      const validKeys = decryptedKeys.filter((key) => key !== null);
      localStorage.setItem("walletKeys", JSON.stringify(validKeys));
      if (validKeys.find((key) => key.chain === "solana")) {
        const solanaKey = validKeys.find((key) => key.chain === "solana");
        WalletKey.setSolanaKey(solanaKey);
      }
      WalletKey.setEthereum(validKeys[0]);
    } catch (err) {
      console.error("Error decrypting and storing keys:", err);
    }
  };

  const createSession = async (password) => {
    setIsLoading(true);
    const sessionToken = `session_${Date.now()}`;
    const sessionExpiry = Date.now() + 5 * 60 * 60 * 1000;
    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("sessionExpiry", sessionExpiry);
    setIsSessionValid(true);
    setIsRegistered(true);
    await decryptAndStoreKeys(password);
    setIsLoading(false);
  };

  const destroySession = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("sessionExpiry");
    localStorage.removeItem("walletKeys");
    setIsSessionValid(false);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const registered = await checkRegistration();
      setIsRegistered(registered);
      setIsSessionValid(sessionIsValid());
      setIsLoading(false);
      setIsInitialized(true); // Mark as initialized after async work completes
    };
    init();
  }, []);

  useEffect(() => {
    if (isSessionValid) {
      const sessionExpiry = parseInt(localStorage.getItem("sessionExpiry"), 10);
      const timeRemaining = sessionExpiry - Date.now();
      const timeout = setTimeout(() => {
        destroySession();
      }, timeRemaining);
      return () => clearTimeout(timeout);
    }
  }, [isSessionValid]);

  return (
    <SessionContext.Provider
      value={{
        isRegistered,
        isSessionValid,
        createSession,
        destroySession,
        isInitialized,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
