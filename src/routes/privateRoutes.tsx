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
import { assignmentRoutes } from "@/features/assignments/routes";
import { subjectRoutes } from "@/features/subjects/routes";
import { studentAssignmentRoutes } from "@/features/student-assignment/routes";
import { zoomMeetingRoutes } from "@/features/zoom-meeting/routes";
import { studentClassRoutes } from "@/features/student-class/routes";

import NewFeed from "@/features/newfeed/NewFeed";
import UploadField from "@/features/newfeed/components/UploadField";
import { announcementRoutes } from "@/features/announcements/routes";
import { eventRoutes } from "@/features/events/routes";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Chat = lazy(() => import("@/features/chat/Chat"));
const StudentCourse = lazy(
  () => import("@/features/student-course/StudentCourse")
);
const StudentQuiz = lazy(() => import("@/features/student-quiz/StudentQuiz"));
const LearnCourse = lazy(
  () => import("@/features/student-course/learnCourse/LearnCourse")
);
const AnswerQuiz = lazy(
  () => import("@/features/student-quiz/answerQuiz/AnswerQuiz")
);
const Calendar = lazy(() => import("@/features/calendar/Calendar"));

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
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/announcements/*",
        children: announcementRoutes,
      },
      {
        path: "/events/*",
        children: eventRoutes,
      },
      {
        path: "/assignments/*",
        children: assignmentRoutes,
      },
      {
        path: "/student-assignments/*",
        children: studentAssignmentRoutes,
      },
      {
        path: "/student-classes/*",
        children: studentClassRoutes,
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
        path: "/zoom-meetings/*",
        children: zoomMeetingRoutes,
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
        path: "/grades/details/:gradeId/subjects/*",
        children: subjectRoutes,
      },
      {
        path: "/grades/details/:gradeId/sections/details/:sectionId/students/*",
        children: sectionStudentRoutes,
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
