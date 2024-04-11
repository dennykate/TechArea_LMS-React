import { lazy } from "react";
import { Navigate } from "react-router-dom";

const AnnouncementCreate = lazy(() => import("./create/Create"));
const AnnouncementEdit = lazy(() => import("./edit/Edit"));
const  AnnouncementList = lazy(() => import("./list/List"));
const  AnnouncementDetails = lazy(() => import("./details/Details"));

export const announcementRoutes = [
  {
    path: "list",
    element: <AnnouncementList />,
  },
  {
    path: "create",
    element: <AnnouncementCreate />,
  },
  {
    path: "details/:announcementId",
    element: <AnnouncementDetails />,
  },
  {
    path: "edit/:announcementId",
    element: <AnnouncementEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
