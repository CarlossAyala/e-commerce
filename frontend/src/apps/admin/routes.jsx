import { Outlet } from "react-router-dom";
import { NotFound } from "@/shared/components";
import { Dashboard } from "./features/dashboard";
import { categoryRoutes } from "./features/categories";
import { storeRoutes } from "./features/stores";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const adminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "categories",
    element: <Outlet />,
    children: categoryRoutes,
  },
  {
    path: "stores",
    element: <Outlet />,
    children: storeRoutes,
  },
  {
    path: "*",
    element: <NotFound className="flex-1" />,
  },
];
