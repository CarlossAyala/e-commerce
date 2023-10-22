export const categoryTypes = {
  main: "main",
  sub: "sub",
  single: "single",
};

export const categoryActionRoutes = {
  root: "/admin/categories",
  new: "/admin/categories/new",
  attach: "/admin/categories/attach",
  detach: "/admin/categories/detach",
  details: (id) => `/admin/categories/${id}/details`,
};
