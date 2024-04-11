import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Grid = lazy(() => import("./grid/Grid"));
const Details = lazy(() => import("./details/Details"));

export const studentClassRoutes = [
  {
    path: "grid",
    element: <Grid />,
  },
  {
    path: ":classId",
    element: <Details />,
  },
  {
    path: "*",
    element: <Navigate to="grid" />,
  },
];
