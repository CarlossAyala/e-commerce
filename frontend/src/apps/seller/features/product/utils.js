export const PRODUCT_CONDITIONS = ["New", "Used", "Reconditioned"];

export const productActionRoutes = {
  root: "/seller/products",
  new: "/seller/products/new",
  details: (id) => `/seller/products/${id}/details`,
};
