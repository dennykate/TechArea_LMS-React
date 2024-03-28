import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";

import { studentRoutes } from "@/features/accounts/students/routes";
import { teacherRoutes } from "@/features/accounts/teachers/routes";
import { staffRoutes } from "@/features/accounts/staffs/routes";
import { adminRoutes } from "@/features/accounts/admins/routes";
import { courseRoutes } from "@/features/course/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Chat = lazy(() => import("@/features/chat/Chat"));

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
        path: "/courses/*",
        children: courseRoutes,
      },
      {
        path: "/accounts/*",
        children: [
          {
            path: "students",
            children: studentRoutes,
          },
          {
            path: "teachers",
            children: teacherRoutes,
          },
          {
            path: "staffs",
            children: staffRoutes,
          },
          {
            path: "admins",
            children: adminRoutes,
          },
        ],
      },
    ],
  },
  {
    path: "chat",
    element: <Chat />,
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default privateRoutes;
