import { ReviewList, ReviewTimeline } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const reviewRoutes = [
  {
    index: true,
    element: <ReviewTimeline />,
  },
  {
    path: ":productId",
    element: <ReviewList />,
  },
];
