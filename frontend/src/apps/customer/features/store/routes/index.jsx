import { Store, Stores } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Stores />,
  },
  {
    path: ":store",
    element: <Store />,
  },
];
