import { CheckoutPaymentMethod, CheckoutShipping } from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const checkoutRoutes = [
  {
    index: true,
    element: <CheckoutShipping />,
  },
  {
    path: "payment-method",
    element: <CheckoutPaymentMethod />,
  },
];
