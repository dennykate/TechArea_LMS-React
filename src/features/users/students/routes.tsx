import { lazy } from "react";
import { Navigate } from "react-router-dom";

const StudentCreate = lazy(() => import("./create/Create"));
const StudentList = lazy(() => import("./list/List"));
const StudentDetails = lazy(() => import("./details/Details"));

export const studentRoutes = [
  {
    path: "list",
    element: <StudentList />,
  },
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
    element: <Navigate to="list" />,
  },
];
