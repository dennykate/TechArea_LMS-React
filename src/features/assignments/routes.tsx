import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AssignmentCreate = lazy(() => import("./create/Create"));
const AssignmentList = lazy(() => import("./List/List"));

export const assignmentRoutes = [
  {
    path: "create",
    element: <AssignmentCreate />,
  },
  {
    path: "list",
    element: <AssignmentList />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
