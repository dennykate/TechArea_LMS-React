import { lazy } from "react";
import { Navigate } from "react-router-dom";

// const ScheduleCreate = lazy(() => import("./create/Create"));
const ScheduleEdit = lazy(() => import("./edit/Edit"));
// const ScheduleList = lazy(() => import("./list/List"));
const ScheduleDetails = lazy(() => import("./details/Details"));

export const scheduleRoutes = [
  // {
  //   path: "list",
  //   element: <ScheduleList />,
  // },
  // {
  //   path: "create",
  //   element: <ScheduleCreate />,
  // },
  {
    path: "edit/:scheduleId",
    element: <ScheduleEdit />,
  },
  {
    path: "details/:scheduleId",
    element: <ScheduleDetails />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
