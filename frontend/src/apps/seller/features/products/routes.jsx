import { Details, List, Create } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const productRoutes = [
  {
    index: true,
    element: <List />,
  },
  {
    path: "new",
    element: <Create />,
  },
  {
    path: ":productId/details",
    element: <Details />,
  },
];
