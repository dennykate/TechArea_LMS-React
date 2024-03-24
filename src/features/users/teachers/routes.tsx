import { lazy } from "react";
import { Navigate } from "react-router-dom";

const TeacherCreate = lazy(() => import("./create/Create"));
const TeacherList = lazy(() => import("./list/List"));
const TeacherDetails = lazy(() => import("./details/Details"));

export const teacherRoutes = [
  {
    path: "list",
    element: <TeacherList />,
  },
  {
    path: "create",
    element: <TeacherCreate />,
  },
  {
    path: "details/:TeacherId",
    element: <TeacherDetails />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
