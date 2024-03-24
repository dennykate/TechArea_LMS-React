import { lazy } from "react";
import { Navigate } from "react-router-dom";

const StaffCreate = lazy(() => import("./create/Create"));
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
    path: "details/:StaffId",
    element: <StaffDetails />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
