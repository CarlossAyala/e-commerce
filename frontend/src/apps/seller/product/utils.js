export const PRODUCT_CONDITIONS = ["New", "Used", "Reconditioned"];

export const productActionRoutes = {
  root: "/seller/product",
  new: "/seller/product/new",
  edit: (id) => `/seller/product/${id}/detail`,
  details: (id) => `/seller/product/${id}/detail`,
};