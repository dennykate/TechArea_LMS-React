/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import _rivateRoutes from "./privateRoutes";
import { useEncryptStorage } from "use-encrypt-storage";

const routes = () => {
  const { get } = useEncryptStorage();

  const isAuth = get("name");

  const routes = isAuth ? _rivateRoutes : publicRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};

export default routes;
