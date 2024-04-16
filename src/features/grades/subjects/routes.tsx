import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SubjectCreate = lazy(() => import("./create/Create"));
const SubjectEdit = lazy(() => import("./edit/Edit"));

export const subjectRoutes = [
  {
    path: "create",
    element: <SubjectCreate />,
  },
  {
    path: "edit/:subjectId",
    element: <SubjectEdit />,
  },
  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
