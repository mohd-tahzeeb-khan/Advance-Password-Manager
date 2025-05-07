import crypto from "crypto";

const algorithm = "aes-256-cbc"; // AES Algorithm
const backend_secret=process.env.ENCRYPTION_KEY
const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY //|| "1234567890abcdef1234567890abcdef"; // Must be 32 bytes
const key = crypto.createHash('sha256').update(secretKey).digest();
const BEkey = crypto.createHash('sha256').update(backend_secret).digest();

const iv = crypto.randomBytes(16); // Initialization Vector (16 bytes)

/**
 * Encrypt data
 * @param {string} text - The text to encrypt
 * @returns {string} Encrypted text (Base64 format)
 */
export function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "utf-8"), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function BEencrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(BEkey, "utf-8"), iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
  }

/**
 * Decrypt data
 * @param {string} encryptedData - The encrypted text in Base64 format
 * @returns {string} Decrypted text
 */
export function decrypt(encryptedData) {
  const [ivHex, encryptedText] = encryptedData.split(":");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, "utf-8"), Buffer.from(ivHex, "hex"));
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
export function BEdecrypt(encryptedData) {
    const [ivHex, encryptedText] = encryptedData.split(":");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(BEkey, "utf-8"), Buffer.from(ivHex, "hex"));
    let decrypted = decipher.update(encryptedText, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
  }
