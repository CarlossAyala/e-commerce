import { Orders, OrderDetails } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const orderRoutes = [
  {
    index: true,
    element: <Orders />,
  },
  {
    path: ":orderId/details",
    element: <OrderDetails />,
  },
];
