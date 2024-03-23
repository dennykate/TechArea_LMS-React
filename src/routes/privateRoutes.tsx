import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const UserCreate = lazy(() => import("@/features/users/create/Create"));
const UserList = lazy(() => import("@/features/users/list/List"));

const WithDashboardLayout = () => {
  return (
    <DashboardLayout>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </DashboardLayout>
  );
};

const privateRoutes = [
  {
    path: "",
    element: <WithDashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        children: [
          {
            path: "list",
            element: <UserList />,
          },
          {
            path: "create",
            element: <UserCreate />,
          },
          {
            path: "*",
            element: <Navigate to="list" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default privateRoutes;
