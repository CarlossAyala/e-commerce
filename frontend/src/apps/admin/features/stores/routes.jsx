import { RequestsVerify, Store, Stores } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Stores />,
  },
  {
    path: "requests-verify",
    element: <RequestsVerify />,
  },
  {
    path: ":storeId",
    element: <Store />,
  },
];
