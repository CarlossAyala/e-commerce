export const checkoutActionRoutes = {
  shipping: (paymentIntentId) => {
    return `/checkout/${paymentIntentId}/shipping`;
  },
  paymentMethod: (paymentIntentId) => {
    return `/checkout/${paymentIntentId}/payment-method`;
  },
  review: (paymentIntentId) => `/checkout/${paymentIntentId}/review`,
  details: (orderId) => `/checkout/${orderId}/details`,
};
