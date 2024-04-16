import React, { useEffect, useMemo } from "react";
import NotAllowed from "@/components/common/NotAllowed";
import useUserInfo from "@/hooks/use-user-info";
import { useLocation, useNavigate } from "react-router-dom";

const withPermissions = <P extends object>(
  Component: React.ComponentType<P>,
  banRoles: string[],
  isDisable?: boolean
) => {
  const WithPermissionsWrapper: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const userInfo = useUserInfo();

    useEffect(() => {
      if (pathname === "/dashboard" && userInfo?.role_id == "1") {
        return navigate("/calendar");
      }
    }, [pathname]);

    const isBanUser = useMemo(
      () => banRoles?.includes(userInfo?.role_id),
      [userInfo, banRoles]
    );

    if (isBanUser) {
      if (isDisable) return <></>;

      return <NotAllowed />;
    }

    return <Component {...props} />;
  };

  return WithPermissionsWrapper;
};

export default withPermissions;
