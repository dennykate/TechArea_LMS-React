import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Landing = lazy(() => import("./pages/Landing"));
const Accouncements = lazy(() => import("./pages/Announcements"));
const Events = lazy(() => import("./pages/Events"));
const Courses = lazy(() => import("./pages/Courses"));

export const landingRoutes = [
  {
    path: "",
    element: <Landing />,
  },
  {
    path: "/announcements",
    element: <Accouncements />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "*",
    element: <Navigate to="" />,
  },
];
