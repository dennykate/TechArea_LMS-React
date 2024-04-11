import config from "@/config";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import { useCallback } from "react";

const useEncryptStorage = () => {
  const secretKey = config.secretKey;
  const set = useCallback(
    (key: string, value: string) => {
      const encryptedValue = AES.encrypt(value, secretKey).toString();
      localStorage.setItem(key, encryptedValue);
    },
    [secretKey]
  );
  const get = useCallback(
    (key: string) => {
      const value = localStorage.getItem(key);
      if (!value) return null;

      const decryptedValue = AES.decrypt(value, secretKey).toString(
        CryptoJS.enc.Utf8
      );

      return decryptedValue;
    },
    [secretKey]
  );
  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);
  return { set, get, remove };
};
export default useEncryptStorage;
