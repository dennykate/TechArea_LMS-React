import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Grid = lazy(() => import("./grid/Grid"));

export const studentMeetingRoutes = [
  {
    path: "grid",
    element: <Grid />,
  },
  {
    path: "*",
    element: <Navigate to="grid" />,
  },
];
