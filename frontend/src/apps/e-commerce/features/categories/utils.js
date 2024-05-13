export const categoryActionRoutes = {
  root: (query) => "/categories" + (query ? "?" + query : ""),
  details: (name) => `/categories/${name}`,
};
