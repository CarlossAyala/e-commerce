export const PRODUCT_CONDITIONS = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Used",
    value: "used",
  },
  {
    label: "Reconditioned",
    value: "reconditioned",
  },
];

export const productActionRoutes = {
  root: "/seller/products",
  new: "/seller/products/new",
  details: (id) => `/seller/products/${id}/details`,
};
