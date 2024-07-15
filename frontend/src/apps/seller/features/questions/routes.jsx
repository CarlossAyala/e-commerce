import { Overview, QuestionsProduct } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const questionRoutes = [
  {
    index: true,
    element: <Overview />,
  },
  {
    path: ":productId",
    element: <QuestionsProduct />,
  },
];
