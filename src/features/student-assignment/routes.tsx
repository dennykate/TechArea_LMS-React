import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Grid = lazy(() => import("./grid/Grid"));
const Submit = lazy(() => import("./submit/Submit"));

export const studentAssignmentRoutes = [
  {
    path: "grid",
    element: <Grid />,
  },
  {
    path: "submit/:assignmentId",
    element: <Submit />,
  },
  {
    path: "*",
    element: <Navigate to="grid" />,
  },
];
