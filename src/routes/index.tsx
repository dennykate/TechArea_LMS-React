/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import _rivateRoutes from "./privateRoutes";

const routes = () => {
  const isAuth = false;

  const routes = isAuth ? _rivateRoutes : publicRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
};

export default routes;
