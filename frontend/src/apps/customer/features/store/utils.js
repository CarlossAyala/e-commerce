export const storeActionRoutes = {
  root: (query) => `/customer/stores?${query}`,
  details: ({ storeId, slug }) => `/customer/stores/${storeId}/:${slug}`,
};
