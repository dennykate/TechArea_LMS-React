import { lazy } from "react";
import { Navigate } from "react-router-dom";

const ZoomMeetingCreate = lazy(() => import("./create/Create"));
const ZoomMeetingList = lazy(() => import("./list/List"));
const ZoomMeetingDetails = lazy(() => import("./details/Details"));

export const zoomMeetingRoutes = [
  {
    path: "list",
    element: <ZoomMeetingList />,
  },
  {
    path: "create",
    element: <ZoomMeetingCreate />,
  },
  {
    path: "details/:zoomMeetingId",
    element: <ZoomMeetingDetails />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
