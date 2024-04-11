import { lazy } from "react";
import { Navigate } from "react-router-dom";

const QuizCreate = lazy(() => import("./create/Create"));
const QuizList = lazy(() => import("./list/List"));
const QuizDetails = lazy(() => import("./details/Details"));
const QuizEdit = lazy(() => import("./edit/Edit"));

export const quizRoutes = [
  {
    path: "list",
    element: <QuizList />,
  },
  {
    path: "create",
    element: <QuizCreate />,
  },
  {
    path: "details/:quizId",
    element: <QuizDetails />,
  },
  {
    path: "edit/:quizId",
    element: <QuizEdit />,
  },
  {
    path: "*",
    element: <Navigate to="list" />,
  },
];
