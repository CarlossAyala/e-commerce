import {
  CheckoutPaymentMethod,
  CheckoutReview,
  CheckoutShipping,
  CheckoutSuccess,
} from "../pages";
import WithPaymentIntent from "./with-payment-intent";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const checkoutRoutes = [
  {
    index: true,
    element: <WithPaymentIntent component={CheckoutShipping} />,
  },
  {
    path: "payment-method",
    element: <WithPaymentIntent component={CheckoutPaymentMethod} />,
  },
  {
    path: "review",
    element: <WithPaymentIntent component={CheckoutReview} />,
  },
  {
    path: ":orderId/success",
    element: <CheckoutSuccess />,
  },
];
