import { Categories, Category } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const categoryRoutes = [
  {
    index: true,
    element: <Categories />,
  },
  {
    path: ":slug",
    element: <Category />,
  },
];
