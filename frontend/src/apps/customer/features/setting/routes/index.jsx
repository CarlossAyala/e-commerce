import { Outlet } from "react-router-dom";
import { addressRoutes } from "../../address";
import { Account, Cards, Profile } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const settingRoutes = [
  {
    index: true,
    element: <Profile />,
  },
  {
    path: "account",
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
