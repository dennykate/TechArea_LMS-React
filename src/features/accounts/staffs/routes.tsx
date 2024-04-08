import { lazy } from "react";
import { Navigate } from "react-router-dom";

const StaffCreate = lazy(() => import("./create/Create"));
const StaffEdit = lazy(() => import("./edit/Edit"));
const StaffList = lazy(() => import("./list/List"));
const StaffDetails = lazy(() => import("./details/Details"));

export const staffRoutes = [
  {
    path: "list",
    element: <StaffList />,
  },
  {
    path: "create",
    element: <StaffCreate />,
  },
  {
    path: "details/:staffId",
    element: <StaffDetails />,
  },
  {
    path: "edit/:staffId",
    element: <StaffEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
