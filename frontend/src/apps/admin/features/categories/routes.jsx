import { Overview, Details, Attach, Detach, Create } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const categoryRoutes = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: "create",
    element: <Create />,
  },
  {
    path: "attach",
    element: <Attach />,
  },
  {
    path: "detach",
    element: <Detach />,
  },
  {
    path: ":categoryId/details",
    element: <Details />,
  },
];
