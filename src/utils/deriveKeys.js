// src/utils/deriveKeys.js

import { mnemonicToSeedSync } from "bip39";
import * as ecc from "tiny-secp256k1";
import BIP32Factory from "bip32";
import { keccak256 } from "@ethersproject/keccak256";
import { ripemd160 } from "@noble/hashes/ripemd160";
import { sha256 } from "@noble/hashes/sha256";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { publicKeyConvert } from "secp256k1";
import { coinTypes } from "../constants/coinTypes";

const bip32 = BIP32Factory(ecc);

/**
 * Derive a Solana Keypair from a mnemonic.
 * Solana only uses the first 32 bytes of the seed.
 */
export const deriveSolanaKeypair = (mnemonic) => {
  const seed = mnemonicToSeedSync(mnemonic); // Buffer
  const derivedSeed = seed.slice(0, 32);
  return Keypair.fromSeed(Uint8Array.from(derivedSeed));
};

/**
 * Given a BIP32 node and coin name, produce { privateKey, publicKey, address }.
 */
const deriveForNonSolana = (node, chain) => {
  const privateKeyHex = Buffer.from(node.privateKey).toString("hex");
  const publicKeyHex = Buffer.from(node.publicKey).toString("hex");
  let address = null;

  // If you want to handle Bitcoin:
  if (chain === "bitcoin") {
    // RIPEMD160(SHA256(PUBKEY))
    const hash = ripemd160(sha256(node.publicKey));
    const prefix = Buffer.from([0x00]);
    const checksum = sha256(sha256(Buffer.concat([prefix, hash]))).slice(0, 4);
    address = bs58.encode(Buffer.concat([prefix, hash, checksum]));
  }
  // If you want to handle Cosmos:
  else if (chain === "cosmos") {
    const hash = ripemd160(sha256(node.publicKey));
    address = `cosmos1${Buffer.from(hash).toString("hex")}`;
  }
  // Ethereum‐style (including BSC, Polygon, Avalanche, Arbitrum, Optimism)
  else {
    // The public key coming from BIP32 is compressed. We need uncompressed for keccak256.
    const compressedPubKey = Buffer.from(node.publicKey, "hex");
    const uncompressedPubKey = publicKeyConvert(compressedPubKey, false); // 65 bytes
    const pubKeyWithoutPrefix = uncompressedPubKey.slice(1); // drop 0x04 prefix
    const hashed = keccak256(pubKeyWithoutPrefix);
    address = `0x${hashed.slice(-40)}`;
  }

  return { privateKey: privateKeyHex, publicKey: publicKeyHex, address };
};

/**
 * Main function: Given a mnemonic, derive all keys for every coin in coinTypes.
 * Returns an array of objects:
 *   { chain, chainId, nativeCurrency, rpcUrl, privateKey, publicKey, address }
 */
export async function deriveAllKeys(mnemonic) {
  const seed = mnemonicToSeedSync(mnemonic);
  const root = bip32.fromSeed(seed);

  const results = [];

  for (const [chain, config] of Object.entries(coinTypes)) {
    const { path, chainId, nativeCurrency, rpcUrl } = config;

    if (chain === "solana") {
      const keypair = deriveSolanaKeypair(mnemonic);
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");
      const publicKey = keypair.publicKey.toString();
      const address = keypair.publicKey.toBase58();

      results.push({
        chain,
        chainId,
        nativeCurrency,
        rpcUrl,
        privateKey,
        publicKey,
        address,
      });
    } else {
      // m/44'/{path}'/0'/0/0
      const node = root.derivePath(`m/44'/${path}'/0'/0/0`);
      const { privateKey, publicKey, address } = deriveForNonSolana(
        node,
        chain
      );

      results.push({
        chain,
        chainId,
        nativeCurrency,
        rpcUrl,
        privateKey,
        publicKey,
        address,
      });
    }
  }

  return results;
}
