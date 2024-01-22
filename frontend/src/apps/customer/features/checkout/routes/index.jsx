import { Navigate } from "react-router-dom";
import { CheckPaymentIntent } from "../components/check-payment-intent";
import {
  CheckoutPaymentMethod,
  CheckoutReview,
  CheckoutShipping,
  CheckoutDetail,
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
        <CheckoutPaymentMethod />
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
  // TODO: Move this to Order page
  {
    path: ":orderId/details",
    element: <CheckoutDetail />,
  },
];
