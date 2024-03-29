import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Wrapper } from "@/components";

import { studentRoutes } from "@/features/accounts/students/routes";
import { teacherRoutes } from "@/features/accounts/teachers/routes";
import { staffRoutes } from "@/features/accounts/staffs/routes";
import { adminRoutes } from "@/features/accounts/admins/routes";
import { courseRoutes } from "@/features/course/routes";
import { gradeRoutes } from "@/features/grades/routes";
import { sectionRoutes } from "@/features/sections/routes";
import { sectionStudentRoutes } from "@/features/students/routes";
import { scheduleRoutes } from "@/features/schedules/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Chat = lazy(() => import("@/features/chat/Chat"));
const StudentCourse = lazy(
  () => import("@/features/studentCourse/StudentCourse")
);
const LearnCourse = lazy(
  () => import("@/features/studentCourse/learnCourse/LearnCourse")
);

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
        path: "/courses/*",
        children: courseRoutes,
      },
      {
        path: "/student-courses",
        element: <StudentCourse />,
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
      {
        path: "/schedules/*",
        children: scheduleRoutes,
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
    path: "learn-course/:courseId",
    element: (
      <Wrapper>
        <LearnCourse />
      </Wrapper>
    ),
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
