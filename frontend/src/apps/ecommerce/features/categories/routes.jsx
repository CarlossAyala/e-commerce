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
    path: ":categoryId",
    element: <Category />,
  },
];
