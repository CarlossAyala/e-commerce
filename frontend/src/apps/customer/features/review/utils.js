export const reviewActionRoutes = {
  list: (query) => `/customer/reviews?${query}`,
  new: (reviewId) => `/customer/reviews/${reviewId}/new`,
};
