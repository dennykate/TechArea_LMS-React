import { lazy } from "react";

import { Wrapper } from "@/components";
import paths from "./paths";

const Login = lazy(() => import("@/features/login/Login"));

const publicRoutes = [
  {
    path: paths.login,
    element: (
      <Wrapper>
        <Login />
      </Wrapper>
    ),
  },
];

export default publicRoutes;
