export const storeActionRoutes = {
  root: (query) => `/stores?${query}`,
  details: ({ id }) => `/stores/${id}`,
};
