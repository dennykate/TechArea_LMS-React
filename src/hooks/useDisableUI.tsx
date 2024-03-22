import { useCallback } from "react";
import { useEncryptStorage } from "use-encrypt-storage";

const useDisableUI = () => {
  const { get } = useEncryptStorage();

  const check = useCallback((permittedRoles: string[]) => {
    return true;
    const role = get("role");

    if (role === "admin") return true;

    const isExisted = permittedRoles?.find((pRole: string) => pRole === role);

    return !!isExisted;
  }, []);

  return check;
};

export default useDisableUI;
