/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import commonRoutes from "./commonRoutes";
import useEncryptStorage from "@/hooks/use-encrypt-storage";
import useLogout from "@/hooks/useLogout";

const routes = () => {
  const { get } = useEncryptStorage();
  const logout = useLogout();

  try {
    const isAuth = get("token");

    const routes = isAuth ? privateRoutes : publicRoutes;

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
  } catch (error) {
    logout();

    return <></>;
  }
};

export default routes;
