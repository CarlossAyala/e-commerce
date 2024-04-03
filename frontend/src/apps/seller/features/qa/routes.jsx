import { QAOverview, QAProduct } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const qaRoutes = [
  {
    index: true,
    element: <QAOverview />,
  },
  {
    path: ":productId",
    element: <QAProduct />,
  },
];
