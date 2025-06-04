// cryptoUtils.js

export const generateKeyFromPassword = async (password) => {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("wallet_salt"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
};

export const encryptData = async (key, data) => {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate IV

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(data)
  );

  return {
    encrypted: Buffer.from(encrypted).toString("base64"), // Convert to Base64
    iv: Array.from(iv), // Store IV as an array to avoid JSON issues
  };
};

export const decryptData = async (key, encryptedData, iv) => {
  try {
    if (!encryptedData || !iv) {
      throw new Error("Missing encrypted data or IV for decryption.");
    }

    const decoder = new TextDecoder();

    // Convert IV back to Uint8Array
    const ivArray = new Uint8Array(iv);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivArray },
      key,
      Buffer.from(encryptedData, "base64") // Convert Base64 to Buffer
    );

    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
};
