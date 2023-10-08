export const checkoutActionRoutes = {
  shipping: "/customer/checkout",
  paymentMethod: "/customer/checkout/payment-method",
  review: "/customer/checkout/review",
  success: (orderId) => `/customer/checkout/${orderId}/success`,
};
