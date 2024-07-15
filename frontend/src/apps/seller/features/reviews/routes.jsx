import { ReviewsOverview, ReviewsProduct } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const reviewRoutes = [
  {
    index: true,
    element: <ReviewsOverview />,
  },
  {
    path: ":productId",
    element: <ReviewsProduct />,
  },
];
