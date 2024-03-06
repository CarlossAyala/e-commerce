import { Details, Overview, StoreHistory } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: ":requestId/details",
    element: <Details />,
  },
  {
    path: ":storeId/history",
    element: <StoreHistory />,
  },
];