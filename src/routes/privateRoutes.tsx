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
import { quizRoutes } from "@/features/quiz/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Chat = lazy(() => import("@/features/chat/Chat"));
const StudentCourse = lazy(
  () => import("@/features/studentCourse/StudentCourse")
);
const StudentQuiz = lazy(() => import("@/features/studentQuiz/StudentQuiz"));
const LearnCourse = lazy(
  () => import("@/features/studentCourse/learnCourse/LearnCourse")
);
const AnswerQuiz = lazy(
  () => import("@/features/studentQuiz/answerQuiz/AnswerQuiz")
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
        path: "/student-courses",
        element: <StudentCourse />,
      },
      {
        path: "/student-quizzes",
        element: <StudentQuiz />,
      },
      {
        path: "/courses/*",
        children: courseRoutes,
      },
      {
        path: "/quizzes/*",
        children: quizRoutes,
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
    path: "answer-quiz/:quizId",
    element: (
      <Wrapper>
        <AnswerQuiz />
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
