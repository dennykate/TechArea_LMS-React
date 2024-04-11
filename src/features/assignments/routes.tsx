import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AssignmentCreate = lazy(() => import("./create/Create"));
const AssignmentList = lazy(() => import("./List/List"));
const AssignmentDetails = lazy(() => import("./details/Details"));

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
    path: "details/:assignmentId",
    element: <AssignmentDetails />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
