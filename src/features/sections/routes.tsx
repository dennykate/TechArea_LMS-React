import { lazy } from "react";
import { Navigate } from "react-router-dom";

const SectionCreate = lazy(() => import("./create/Create"));
const SectionDetails = lazy(() => import("./details/Details"));
const SectionEdit = lazy(() => import("./edit/Edit"));

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
    path: "edit/:sectionId",
    element: <SectionEdit />,
  },
  {
    path: "*",
    element: <Navigate to="create" />,
  },
];
