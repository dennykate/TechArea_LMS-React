/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import privateRoutes from "./privateRoutes";
import commonRoutes from "./commonRoutes";
import useEncryptStorage from "@/hooks/use-encrypt-storage";

const routes = () => {
  const { get } = useEncryptStorage();

  const isAuth = get("token");

  console.log("token => ", isAuth);

  const routes = isAuth ? privateRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};

export default routes;
