import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";

import { studentRoutes } from "@/features/users/students/routes";
import { teacherRoutes } from "@/features/users/teachers/routes";
import { staffRoutes } from "@/features/users/staffs/routes";
import { adminRoutes } from "@/features/users/admins/routes";
import NewFeed from "@/features/newfeed/NewFeed";
import UploadField from "@/features/newfeed/components/UploadField";

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
        path: "/accounts",
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
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/new-feed",
        element: <NewFeed />,
      },
      {
        path: "/upload",
        element: <UploadField />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default privateRoutes;
