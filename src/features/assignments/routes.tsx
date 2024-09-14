import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AssignmentCreate = lazy(() => import("./create/Create"));
const AssignmentEdit = lazy(() => import("./edit/Edit"));
// const AssignmentList = lazy(() => import("./List/List"));
const AssignmentDetails = lazy(() => import("./details/Details"));

export const assignmentRoutes = [
  {
    path: "create",
    element: <AssignmentCreate />,
  },
  // {
  //   path: "list",
  //   element: <AssignmentList />,
  // },
  {
    path: "edit/:assignmentId",
    element: <AssignmentEdit />,
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
