export const CATEGORY_TYPES = {
  MAIN: "main",
  SUB: "sub",
  SINGLE: "single",
};

export const categoryActionRoutes = {
  root: "/admin/categories",
  create: "/admin/categories/create",
  attach: "/admin/categories/attach",
  detach: "/admin/categories/detach",
  details: (id) => `/admin/categories/${id}/details`,
};
