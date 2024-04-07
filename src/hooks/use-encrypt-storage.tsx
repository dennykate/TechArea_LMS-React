import config from "@/config";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

const useEncryptStorage = () => {
  const secretKey = config.secretKey;
  const set = useCallback(
    (key: string, value: string) => {
      const encryptedValue = AES.encrypt(value, secretKey).toString();
      console.log("store secret => ", secretKey);
      localStorage.setItem(key, encryptedValue);
    },
    [secretKey]
  );
  const get = useCallback(
    (key: string) => {
      const value = localStorage.getItem(key);
      console.log("secret => ", secretKey);
      if (!value) return null;

      try {
        const decryptedValue = AES.decrypt(value, secretKey).toString(
          CryptoJS.enc.Utf8
        );

        console.log("decryptedValue => ", decryptedValue);
        return decryptedValue;
      } catch (error) {
        console.error("Decryption error:", error);
        return null;
      }
    },
    [secretKey]
  );
  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);
  return { set, get, remove };
};
export default useEncryptStorage;
