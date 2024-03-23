import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";
import { studentRoutes } from "@/features/users/students/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));

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
        path: "/students",
        children: studentRoutes,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default privateRoutes;
