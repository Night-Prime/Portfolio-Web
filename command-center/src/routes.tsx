import React, { useEffect } from "react";
import type { RouteObject } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./components/Home";
import Articles from "./pages/Articles";
import CreateArticle from "./pages/CreateArticle";
import { NotificationType, showNotification } from "./service/notification";

const ProtectedRoute: React.FC = () => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    showNotification(
      "Unauthorized, Please log in again!",
      NotificationType.ERROR
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: "/articles",
        children: [
          {
            index: true,
            element: <Articles />,
          },
          {
            path: "create",
            element: <CreateArticle />,
          },
        ],
      },
    ],
  },
];

export default routes;
