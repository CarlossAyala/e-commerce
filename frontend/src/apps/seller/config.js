import { CUSTOMER_NAV } from "../customer/config";

export const SELLER_NAV = {
  dashboard: {
    name: "Dashboard",
    to: "/seller",
  },
  product: {
    name: "Product",
    to: "/seller/product",
  },
  question: {
    name: "Questions",
    to: "/seller/question",
  },
  sale: {
    name: "Sales",
    to: "/seller/sale",
  },
  review: {
    name: "Reviews",
    to: "/seller/review",
  },
  store: {
    name: "Store",
    to: "/seller/store",
  },
  createStore: {
    name: "Create Store",
    to: "/seller/create",
  },
};

export const sellerNav = [
  SELLER_NAV.dashboard,
  SELLER_NAV.product,
  SELLER_NAV.question,
  SELLER_NAV.sale,
  SELLER_NAV.review,
  SELLER_NAV.store,
];

export const customerNav = [
  {
    name: "Back to customers",
    to: CUSTOMER_NAV.home.to,
  },
];
