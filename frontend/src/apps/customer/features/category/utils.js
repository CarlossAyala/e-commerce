export const categoryActionRoutes = {
  root: (query) => "/customer/categories" + (query ? "?" + query : ""),
  details: (slug) => `/customer/categories/${slug}`,
};
