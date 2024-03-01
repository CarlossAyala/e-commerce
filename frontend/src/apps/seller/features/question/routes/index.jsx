import { QuestionOverview, QuestionProduct } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const questionRoutes = [
  {
    index: true,
    element: <QuestionOverview />,
  },
  {
    path: ":productId",
    element: <QuestionProduct />,
  },
];
