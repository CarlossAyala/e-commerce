import { Chat, Welcome } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const chatRoutes = [
  {
    index: true,
    element: <Welcome />,
  },
  {
    path: ":storeId",
    element: <Chat />,
  },
];
