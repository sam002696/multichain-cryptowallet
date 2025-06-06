import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // Import useNavigate
// import { useSession } from "../../context/SessionContext";
import { mnemonicToSeedSync } from "bip39";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import { keccak256 } from "@ethersproject/keccak256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import bs58 from "bs58";
import { saveToDatabase } from "../../../utils/AuthUtility/indexedDB";

import { publicKeyConvert } from "secp256k1";
import logo from "../../../assets/arispay-logo.svg";
import { FiCheckCircle } from "react-icons/fi";
// import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import {
  encryptData,
  generateKeyFromPassword,
} from "../../../utils/AuthUtility/cryptoUtils";
import { useSession } from "../../../context/SessionContext";
// import * as ed from "@noble/ed25519";

const bip32 = BIP32Factory(ecc);

const coinTypes = {
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
  // bitcoin: {
  //   path: 0,
  //   chainId: null,
  //   nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
  //   rpcUrl: "https://blockstream.info/api/",
  // },
  solana: {
    path: 501,
    chainId: "Mainnet Beta",
    nativeCurrency: { name: "Solana", symbol: "SOL", decimals: 9 },
    rpcUrl: "https://api.mainnet-beta.solana.com",
  },
  // cosmos: {
  //   path: 118,
  //   chainId: null,
  //   nativeCurrency: { name: "ATOM", symbol: "ATOM", decimals: 6 },
  //   rpcUrl: "https://cosmos-rpc.publicnode.com",
  // },
};

//  Solana Keypair from mnemonic (browser-safe)
const deriveSolanaKeypair = async (mnemonic) => {
  const seed = mnemonicToSeedSync(mnemonic); // Buffer
  const derivedSeed = seed.slice(0, 32); // Solana uses only first 32 bytes
  const keypair = Keypair.fromSeed(Uint8Array.from(derivedSeed));
  return keypair;
};

const KeyDisplay = ({ mnemonic, password }) => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const { createSession } = useSession();

  useEffect(() => {
    const generateKeys = async () => {
      try {
        const seed = mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seed);
        const encryptionKey = await generateKeyFromPassword(password);

        const results = [];

        for (const [
          chain,
          { path, chainId, nativeCurrency, rpcUrl },
        ] of Object.entries(coinTypes)) {
          // const node = root.derivePath(`m/44'/${path}'/0'/0/0`);
          // const privateKey = Buffer.from(node.privateKey).toString("hex");
          // let publicKey = Buffer.from(node.publicKey).toString("hex");

          // console.log(`🔹 Public Key (${chain}):`, publicKey);
          // console.log(`🔹 Private Key (${chain}):`, privateKey);

          let privateKey = null;
          let publicKey = null;
          let formattedAddress = null;

          if (chain === "solana") {
            // const key = derivePath("m/44'/501'/0'/0'", seed.toString("hex"));
            // const keypair = Keypair.fromSeed(key);
            // privateKey = Buffer.from(keypair.secretKey).toString("hex");
            // publicKey = keypair.publicKey.toString();
            // formattedAddress = keypair.publicKey.toBase58();

            const keypair = await deriveSolanaKeypair(mnemonic);
            privateKey = Buffer.from(keypair.secretKey).toString("hex");
            publicKey = keypair.publicKey.toString();
            formattedAddress = keypair.publicKey.toBase58();

            console.log(`🔹 Public Key (${chain}):`, publicKey);
            console.log(`🔹 Private Key (${chain}):`, privateKey);
            console.log(`🔹 formattedAddress (${chain}):`, formattedAddress);
          } else {
            const node = root.derivePath(`m/44'/${path}'/0'/0/0`);
            privateKey = Buffer.from(node.privateKey).toString("hex");
            publicKey = Buffer.from(node.publicKey).toString("hex");

            // let formattedAddress;

            if (chain === "bitcoin") {
              const hash = ripemd160(sha256(node.publicKey));
              const prefix = Buffer.from([0x00]);
              const checksum = sha256(
                sha256(Buffer.concat([prefix, hash]))
              ).slice(0, 4);
              formattedAddress = bs58.encode(
                Buffer.concat([prefix, hash, checksum])
              );
            } else if (chain === "cosmos") {
              const hash = ripemd160(sha256(node.publicKey));
              formattedAddress = `cosmos1${Buffer.from(hash).toString("hex")}`;
            }
            // address generation for solana network
            // else if (chain === "solana") {
            //   formattedAddress = bs58.encode(node.publicKey);
            // }
            else {
              // ✅ FIX: Decompress Public Key for Ethereum Address Generation
              const compressedPubKey = Buffer.from(node.publicKey, "hex");
              const uncompressedPubKey = publicKeyConvert(
                compressedPubKey,
                false
              ); // false → uncompressed (65 bytes)
              const pubKeyWithoutPrefix = uncompressedPubKey.slice(1); // Remove the 0x04 prefix (64 bytes)

              // ✅ Correct Ethereum Address Derivation
              const hashedPublicKey = keccak256(pubKeyWithoutPrefix);
              formattedAddress = `0x${hashedPublicKey.slice(-40)}`;

              console.log(
                `✅ Derived Ethereum Address (${chain}):`,
                formattedAddress
              );
            }
          }

          results.push({
            chain,
            chainId,
            nativeCurrency,
            rpcUrl,
            privateKey,
            publicKey,
            address: formattedAddress,
          });
        }

        // Encrypt and save data
        const encryptedMnemonic = await encryptData(encryptionKey, mnemonic);
        const encryptedSeed = await encryptData(encryptionKey, seed);
        const encryptedKeys = await Promise.all(
          results.map(async (key) => {
            const encryptedPrivateKey = await encryptData(
              encryptionKey,
              key.privateKey
            );
            return {
              ...key,
              privateKey: {
                encrypted: encryptedPrivateKey.encrypted, // Store encrypted key properly
                iv: encryptedPrivateKey.iv, // Include IV for decryption
              },
            };
          })
        );

        await saveToDatabase("WalletDB", "walletStore", {
          id: "walletData",
          mnemonic: encryptedMnemonic,
          seed: encryptedSeed,
          keys: encryptedKeys,
        });

        setAddresses(results);
      } catch (error) {
        console.error("❌ Error generating or saving keys:", error);
      }
    };

    generateKeys();
  }, [mnemonic, password]);

  const handleOpenWallet = () => {
    createSession(password);
    navigate("/wallet");
  };

  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-8 mt-4">
        <div className="w-38 h-38 rounded-full border border-light flex items-center relative after-border2">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-semibold text-white">
        Your wallet is ready to <span className="text-gradient ml-2">use!</span>
      </h1>
      <p className="mt-2 text-gray-500 text-md font-medium">
        Remember to backup and keep your Secret Phrase safe.
      </p>

      {/* Success Icon */}
      <div className="mt-6">
        <FiCheckCircle className="text-icon w-16 h-16" />
      </div>

      {/* Default Wallet Section */}
      <div className="flex items-center justify-between w-full px-5 rounded-t-xl py-6 black-box border-d-color border-dashed border border-b-0 hover:bg-[#1b2040] transition mt-6">
        <h2 className="text-xl text-center text-purple-400">
          Click at the top right of your browser and pin Arispay Wallet for easy
          access.
        </h2>
      </div>

      {/* Open Wallet Section */}
      <div className="items-center justify-between w-full px-5 py-4 mb-4 rounded-b-xl black-box-two border-dashed border border-d-color hover:bg-[#1b2040] transition">
        <p className="text-md text-gray-400 my-5">
          To enable seamless dApp connections, Set Arispay to default.
        </p>
        <button
          onClick={handleOpenWallet}
          className="px-20 py-2 rounded-full bg-gradient-to-r bg-gradient  text-white  shadow-md hover:opacity-90 transition mb-3"
        >
          Open Wallet
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
        <span>© 2024 Arispay</span>
        <span className="mx-2">•</span>
        <span className="hover:text-purple-400 cursor-pointer">
          Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default KeyDisplay;
