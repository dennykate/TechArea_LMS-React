import { Navigate, Outlet } from "react-router-dom";

import { Wrapper } from "@/components";
import { landingRoutes } from "@/features/landing/routes";

const WithWrapper = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const publicRoutes = [
  {
    element: <WithWrapper />,
    children: [
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
