export const storeActionRoutes = {
  root: (query) => `/customer/stores?${query}`,
  details: (slug) => `/customer/stores/${slug}`,
};
