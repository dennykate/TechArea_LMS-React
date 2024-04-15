import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AdminCreate = lazy(() => import("./create/Create"));
const AdminEdit = lazy(() => import("./edit/Edit"));
const AdminList = lazy(() => import("./list/List"));
const AdminDetails = lazy(() => import("./details/Details"));

export const adminRoutes = [
  {
    path: "list",
    element: <AdminList />,
  },
  {
    path: "create",
    element: <AdminCreate />,
  },
  {
    path: "details/:adminId",
    element: <AdminDetails />,
  },
  {
    path: "edit/:adminId",
    element: <AdminEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
