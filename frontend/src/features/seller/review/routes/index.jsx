import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";

const PATH_ROUTE = ["", "seller", "review"].join("/");

export const reviewRoutes = {
  path: "review",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <h1>Review Overview</h1>,
    },
    {
      path: "timeline",
      element: <h1>Review Timeline</h1>,
    },
    {
      path: ":id/list",
      element: <h1>Review List</h1>,
    },
  ],
};

export const reviewNavigation = {
  label: "Review",
  icon: ChatBubbleLeftRightIcon,
  navigation: [
    {
      label: "Overview",
      to: PATH_ROUTE,
    },
    {
      label: "Timeline",
      to: `${PATH_ROUTE}/timeline`,
    },
  ],
};

export const reviewActionRoutes = {
  overview: PATH_ROUTE,
  timeline: `${PATH_ROUTE}/timeline`,
  list: (id) => `${PATH_ROUTE}/${id}/list`,
};
