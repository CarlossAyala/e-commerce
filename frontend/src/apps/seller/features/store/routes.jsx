import { RequestsVerify, Store } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Store />,
  },
  {
    path: "requests-verify",
    element: <RequestsVerify />,
  },
];
