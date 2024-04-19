import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ZoomRecordCreate = lazy(() => import("./create/Create"));
const ZoomRecordEdit = lazy(() => import("./edit/Edit"));
const  ZoomRecordList = lazy(() => import("./list/List"));
const  ZoomRecordDetails = lazy(() => import("./details/Details"));

export const ZoomRecordRoutes = [
  {
    path: "list",
    element: <ZoomRecordList />,
  },
  {
    path: "create",
    element: <ZoomRecordCreate />,
  },
  {
    path: "details/:ZoomRecordId",
    element: <ZoomRecordDetails />,
  },
  {
    path: "edit/:ZoomRecordId",
    element: <ZoomRecordEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
