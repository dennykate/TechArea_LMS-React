import { lazy } from "react";
import { Navigate } from "react-router-dom";

const StudentCreate = lazy(() => import("./create/Create"));

const StudentDetails = lazy(() => import("./details/Details"));

export const sectionStudentRoutes = [
  {
    path: "create",
    element: <StudentCreate />,
  },
  {
    path: "details/:studentId",
    element: <StudentDetails />,
  },
  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
