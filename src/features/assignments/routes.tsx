import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AssignmentCreate = lazy(() => import("./create/Create"));

export const assignmentRoutes = [
  {
    path: "create",
    element: <AssignmentCreate />,
  },

  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
