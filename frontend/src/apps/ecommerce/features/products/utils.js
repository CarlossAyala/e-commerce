export const productActionRoutes = {
  root: (query) => `/products${query ? `?${query}` : ""}`,
  details: ({ id, name }) => `/products/${id}/${name}`,
};
