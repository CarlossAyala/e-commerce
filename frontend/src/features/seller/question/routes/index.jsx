import QuestionOverview from "../pages/question-overview";
import QuestionProduct from "../pages/question-product";

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
