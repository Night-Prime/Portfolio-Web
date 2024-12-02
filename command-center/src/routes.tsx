import React from "react";
import type { RouteObject } from "react-router";
import Login from "./pages/Login";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
];

export default routes;
