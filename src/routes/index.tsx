/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import _privateRoutes from "./privateRoutes";

const routes = () => {
  const isAuth = true;

  const privateRoutes = isAuth ? _privateRoutes : [];

  const element = useRoutes([...publicRoutes, ...privateRoutes]);

  return <>{element}</>;
};

export default routes;
