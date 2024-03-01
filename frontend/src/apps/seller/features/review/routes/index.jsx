import ReviewList from "../pages/review-list";
import ReviewOverview from "../pages/review-overview";
import ReviewTimeline from "../pages/review-timeline";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const reviewRoutes = [
  {
    index: true,
    element: <ReviewOverview />,
  },
  {
    path: "timeline",
    element: <ReviewTimeline />,
  },
  {
    path: ":productId/list",
    element: <ReviewList />,
  },
];
