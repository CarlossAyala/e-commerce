import { Home } from "../features/dashboard";

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
    element: <Home />,
  },
];
