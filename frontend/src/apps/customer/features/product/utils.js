export const productActionRoutes = {
  root: (query) => "/customer/products" + (query ? "?" + query : ""),
  details: ({ id, name }) => `/customer/products/${id}/${name}`,
};
