import { useMemo } from "react";
import useEncryptStorage from "./use-encrypt-storage";

const useUserInfo = () => {
  const { get } = useEncryptStorage();

  const userInfo = useMemo(() => JSON.parse(get("userInfo") as string), []);

  return userInfo;
};

export default useUserInfo;
