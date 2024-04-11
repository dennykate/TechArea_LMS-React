import { lazy } from "react";
import { Navigate } from "react-router-dom";

const GradeCreate = lazy(() => import("./create/Create"));
const GradeList = lazy(() => import("./list/List"));
const GradeEdit = lazy(() => import("./edit/Edit"));
const GradeDetails = lazy(() => import("./details/Details"));

export const gradeRoutes = [
  {
    path: "list",
    element: <GradeList />,
  },
  {
    path: "create",
    element: <GradeCreate />,
  },
  {
    path: "details/:gradeId",
    element: <GradeDetails />,
  },
  {
    path: "edit/:gradeId",
    element: <GradeEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
