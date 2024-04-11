import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
export class EncryptStorage {
  secretKey: string;
  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  set(key: string, value: string, expires: number | undefined = undefined) {
    const encryptedValue = AES.encrypt(value, this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
    if (expires) {
      const expirationTimestamp = Date.now() + expires * 60 * 1000;
      localStorage.setItem(`${key}_expiration`, expirationTimestamp.toString());
    }
  }
  get(key: string) {
    const value = localStorage.getItem(key);
    const expirationTimestamp = localStorage.getItem(`${key}_expiration`);
    if (!value) return null;
    if (expirationTimestamp && Date.now() > parseInt(expirationTimestamp, 10)) {
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expiration`);
      return null;
    }
    const decryptedValue = AES.decrypt(value, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return decryptedValue;
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
