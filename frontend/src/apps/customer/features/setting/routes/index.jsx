import { Outlet } from "react-router-dom";
import { addressRoutes } from "../../address";
import { Account, Cards } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const settingRoutes = [
  {
    index: true,
    element: <Account />,
  },
  {
    path: "cards",
    element: <Cards />,
  },
  {
    path: "addresses",
    element: <Outlet />,
    children: addressRoutes,
  },
];
