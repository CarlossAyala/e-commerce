import { CubeIcon } from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";

const PATH_ROUTE = ["", "seller", "product"];
const BASE_ROUTE = PATH_ROUTE.join("/");

export const productRoutes = {
  path: "product",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <h1>Product List</h1>,
    },
    {
      path: "new",
      element: <h1>Product New</h1>,
    },
    {
      path: "stock-alert",
      element: <h1>Product Stock Alert</h1>,
    },
    {
      path: ":id/view",
      element: <h1>Product Stock Alert</h1>,
    },
    {
      path: ":id/edit",
      element: <h1>Product View</h1>,
    },
  ],
};

export const productNavigation = {
  label: "Product",
  icon: CubeIcon,
  navigation: [
    {
      label: "New",
      to: `${BASE_ROUTE}/new`,
    },
    {
      label: "List",
      to: BASE_ROUTE,
    },
    {
      label: "Stock Alert",
      to: `${BASE_ROUTE}/stock-alert`,
    },
  ],
};

export const productActionRoutes = {
  list: `${BASE_ROUTE}/list`,
  new: `${BASE_ROUTE}/new`,
  stockAlert: `${BASE_ROUTE}/stock-alert`,
  detail: (id) => `${BASE_ROUTE}/${id}/detail`,
  edit: (id) => `${BASE_ROUTE}/${id}/edit`,
};
