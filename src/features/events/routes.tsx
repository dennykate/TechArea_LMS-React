import { lazy } from "react";
import { Navigate } from "react-router-dom";

const EventCreate = lazy(() => import("./create/Create"));
const EventEdit = lazy(() => import("./edit/Edit"));
const EventList = lazy(() => import("./list/List"));
const EventDetails = lazy(() => import("./details/Details"));

export const eventRoutes = [
  {
    path: "list",
    element: <EventList />,
  },
  {
    path: "create",
    element: <EventCreate />,
  },
  {
    path: "details/:eventId",
    element: <EventDetails />,
  },
  {
    path: "edit/:eventId",
    element: <EventEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
