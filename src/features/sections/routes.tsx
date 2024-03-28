import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SectionCreate = lazy(() => import("./create/Create"));
const SectionDetails = lazy(() => import("./details/Details"));

export const sectionRoutes = [
  {
    path: "create",
    element: <SectionCreate />,
  },
  {
    path: "details/:sectionId",
    element: <SectionDetails />,
  },

  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
