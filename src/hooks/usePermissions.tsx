import { useMemo } from "react";
import { useEncryptStorage } from "use-encrypt-storage";

const usePermissions = (permittedRoles: string[]) => {
  const { get } = useEncryptStorage();

  const isPermitted = useMemo(() => {
    const role = get("role");

    if (role === "admin") return true;

    const isExisted = permittedRoles?.find((pRole: string) => pRole === role);

    return !!isExisted;
  }, [permittedRoles]);

  return isPermitted;
};

export default usePermissions;
