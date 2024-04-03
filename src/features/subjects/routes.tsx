import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SubjectCreate = lazy(() => import("./create/Create"));

export const subjectRoutes = [
  {
    path: "create",
    element: <SubjectCreate />,
  },

  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
