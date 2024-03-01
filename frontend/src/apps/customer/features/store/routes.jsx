import { Stores, Store } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Stores />,
  },
  {
    path: ":slug",
    element: <Store />,
  },
];
