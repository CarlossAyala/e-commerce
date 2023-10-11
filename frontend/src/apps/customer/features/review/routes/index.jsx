import { ReviewNew, Reviews } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const reviewRoutes = [
  {
    index: true,
    element: <Reviews />,
  },
  {
    path: ":reviewId/new",
    element: <ReviewNew />,
  },
];
