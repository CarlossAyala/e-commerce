import { Navigate } from "react-router-dom";
import { CheckPaymentIntent } from "../components/check-payment-intent";
import {
  CheckoutPayment,
  CheckoutReview,
  CheckoutShipping,
  CheckoutDetails,
} from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const checkoutRoutes = [
  {
    index: true,
    element: <Navigate to="/customer/cart" replace />,
  },
  {
    path: ":paymentIntentId/shipping",
    element: (
      <CheckPaymentIntent>
        <CheckoutShipping />
      </CheckPaymentIntent>
    ),
  },
  {
    path: ":paymentIntentId/payment-method",
    element: (
      <CheckPaymentIntent>
        <CheckoutPayment />
      </CheckPaymentIntent>
    ),
  },
  {
    path: ":paymentIntentId/review",
    element: (
      <CheckPaymentIntent>
        <CheckoutReview />
      </CheckPaymentIntent>
    ),
  },
  {
    path: ":orderId/details",
    element: <CheckoutDetails />,
  },
];
