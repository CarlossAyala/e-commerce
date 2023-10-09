import { Account, Profile } from "../pages";

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
];
