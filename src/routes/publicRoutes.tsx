import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { Wrapper } from "@/components";

const Login = lazy(() => import("@/features/login/Login"));
const Landing = lazy(() => import("@/features/landing/Landing"));

const publicRoutes = [
  {
    path: "/login",
    element: (
      <Wrapper>
        <Login />
      </Wrapper>
    ),
  },
  {
    path: "/",
    element: (
      <Wrapper>
        <Landing />
      </Wrapper>
    ),
  },

  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default publicRoutes;
