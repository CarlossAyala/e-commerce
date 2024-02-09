export const checkoutActionRoutes = {
  shipping: (paymentIntentId) => {
    return `/customer/checkout/${paymentIntentId}/shipping`;
  },
  paymentMethod: (paymentIntentId) => {
    return `/customer/checkout/${paymentIntentId}/payment-method`;
  },
  review: (paymentIntentId) => `/customer/checkout/${paymentIntentId}/review`,
  details: (orderId) => `/customer/checkout/${orderId}/details`,
};
