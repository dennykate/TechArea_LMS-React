import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AssignmentCreate = lazy(() => import("./create/Create"));
const AssignmentList = lazy(() => import("./List/List"));
const AssignmentSubmit = lazy(() => import("../studentAssignment/submit/Submit"));

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
    path: "submit",
    element: <AssignmentSubmit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
