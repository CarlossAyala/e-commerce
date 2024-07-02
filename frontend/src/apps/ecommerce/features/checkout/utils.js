export const checkoutActionRoutes = {
  shipping: (paymentIntentId) => {
    return `/checkout/${paymentIntentId}/shipping`;
  },
  payment: (paymentIntentId) => {
    return `/checkout/${paymentIntentId}/payment-method`;
  },
  review: (paymentIntentId) => `/checkout/${paymentIntentId}/review`,
  details: ({ id }) => `/checkout/${id}/details`,
};
