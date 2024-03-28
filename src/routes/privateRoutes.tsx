import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";

import { studentRoutes } from "@/features/users/students/routes";
import { teacherRoutes } from "@/features/users/teachers/routes";
import { staffRoutes } from "@/features/users/staffs/routes";
import { adminRoutes } from "@/features/users/admins/routes";
import { gradeRoutes } from "@/features/grades/routes";
import { sectionRoutes } from "@/features/sections/routes";
import { sectionStudentRoutes } from "@/features/students/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Profile = lazy(() => import("@/features/profile/Profile"));
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
        path: "/profile",
        element: <Profile />,
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
        path: "/grades/*",
        children: gradeRoutes,
      },
      {
        path: "/grades/details/:gradeId/sections/*",
        children: sectionRoutes,
      },
      {
        path: "/grades/details/:gradeId/sections/details/:sectionId/students/*",
        children: sectionStudentRoutes,
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
