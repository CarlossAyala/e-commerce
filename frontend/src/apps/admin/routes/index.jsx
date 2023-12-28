import { Outlet } from "react-router-dom";
import { Home } from "../features/dashboard";
import { categoriesRoutes } from "../features";
import { requestsOfficialStoreRoutes } from "../features/requests-official-stores/routes";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const adminRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "categories",
    element: <Outlet />,
    children: categoriesRoutes,
  },
  {
    path: "request-official-stores",
    element: <Outlet />,
    children: requestsOfficialStoreRoutes,
  },
];
