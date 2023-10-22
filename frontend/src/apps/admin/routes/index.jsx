import { Outlet } from "react-router-dom";
import { Home } from "../features/dashboard";
import { categoriesRoutes } from "../features";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const adminRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "official-stores",
    element: <Home />,
  },
  {
    path: "categories",
    element: <Outlet />,
    children: categoriesRoutes,
  },
];
