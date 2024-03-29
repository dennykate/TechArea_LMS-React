import { lazy } from "react";
import { Navigate } from "react-router-dom";

const CourseCreate = lazy(() => import("./create/Create"));
const CourseList = lazy(() => import("./list/List"));
const CourseDetails = lazy(() => import("./details/Details"));
const CourseEdit = lazy(() => import("./edit/Edit"));

export const courseRoutes = [
  {
    path: "list",
    element: <CourseList />,
  },
  {
    path: "create",
    element: <CourseCreate />,
  },
  {
    path: "details/:courseId",
    element: <CourseDetails />,
  },
  {
    path: "edit/:courseId",
    element: <CourseEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
