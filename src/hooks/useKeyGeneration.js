// src/hooks/useKeyGeneration.js

import { useEffect, useState } from "react";
import { deriveAllKeys } from "../utils/deriveKeys";
import {
  encryptData,
  generateKeyFromPassword,
} from "../utils/AuthUtility/cryptoUtils";
import { saveToDatabase } from "../utils/AuthUtility/indexedDB";

export function useKeyGeneration(mnemonic, password) {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mnemonic || !password) return; // do nothing until both are provided

    const generateAndSave = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1. Derive all keys from mnemonic
        const rawKeys = await deriveAllKeys(mnemonic);

        // 2. Derive the master seed (we can reuse bip39-mnemonicToSeed inside deriveAllKeys, but OK)
        //    If you need to save the seed itself, you could do:
        //    const seed = mnemonicToSeedSync(mnemonic);  // but deriveAllKeys has already created a BIP32 root

        // 3. Generate an encryption key from the password
        const encryptionKey = await generateKeyFromPassword(password);

        // 4. Encrypt the mnemonic as a whole, and optionally the entire seed
        const encryptedMnemonic = await encryptData(encryptionKey, mnemonic);
        // If you want to store the raw BIP32 seed, do:
        // const seedBuffer = mnemonicToSeedSync(mnemonic);
        // const encryptedSeed = await encryptData(encryptionKey, seedBuffer);

        // 5. Encrypt each privateKey field inside rawKeys
        const encryptedKeys = await Promise.all(
          rawKeys.map(async (k) => {
            const encryptedPrivateKey = await encryptData(
              encryptionKey,
              k.privateKey
            );
            return {
              ...k,
              privateKey: {
                encrypted: encryptedPrivateKey.encrypted,
                iv: encryptedPrivateKey.iv,
              },
              // We keep publicKey + address in plaintext. If you need to encrypt them, add here.
            };
          })
        );

        // 6. Finally, save everything to IndexedDB
        await saveToDatabase("WalletDB", "walletStore", {
          id: "walletData", // each user can override this ID as needed
          mnemonic: encryptedMnemonic,
          // seed: encryptedSeed, // if you want to save seed
          keys: encryptedKeys,
        });

        // 7. Tell the component which addresses (and raw public keys) are available
        setAddresses(rawKeys);
      } catch (err) {
        console.error("Error in useKeyGeneration:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    generateAndSave();
  }, [mnemonic, password]);

  return { addresses, loading, error };
}
