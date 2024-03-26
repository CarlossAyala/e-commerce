export const categoryActionRoutes = {
  root: (query) => "/categories" + (query ? "?" + query : ""),
  details: (slug) => `/categories/${slug}`,
};
