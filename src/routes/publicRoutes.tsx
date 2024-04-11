import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Wrapper } from "@/components";
import { landingRoutes } from "@/features/landing/routes";

const Login = lazy(() => import("@/features/login/Login"));

const WithWrapper = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const publicRoutes = [
  {
    // path: "",
    element: <WithWrapper />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        children: landingRoutes,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default publicRoutes;
