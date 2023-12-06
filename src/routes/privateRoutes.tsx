import { lazy } from "react";
import { Navigate } from "react-router-dom";

import { Wrapper } from "@/components";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ProductList = lazy(() => import("@/features/products/list/List"));
const ProductCreate = lazy(() => import("@/features/products/create/Create"));

const privateRoutes = [
  {
    path: "/dashboard",
    element: (
      <Wrapper>
        <Dashboard />
      </Wrapper>
    ),
  },
  {
    path: "/products",
    children: [
      {
        path: "list",
        element: (
          <Wrapper>
            <ProductList />
          </Wrapper>
        ),
      },
      {
        path: "create",
        element: (
          <Wrapper>
            <ProductCreate />
          </Wrapper>
        ),
      },
      {
        path: "*",
        element: <Navigate to="list" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" />,
  },
];

export default privateRoutes;
