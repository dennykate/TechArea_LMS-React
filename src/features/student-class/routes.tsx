import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Grid = lazy(() => import("./grid/Grid"));
const Room = lazy(() => import("./room/Room"));

export const studentClassRoutes = [
  {
    path: "grid",
    element: <Grid />,
  },
  {
    path: "room/:roomId",
    element: <Room />,
  },
  {
    path: "*",
    element: <Navigate to="grid" />,
  },
];
