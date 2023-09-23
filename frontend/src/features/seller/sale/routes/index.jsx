import Sale from "../pages/sale";
import SaleDetail from "../pages/sale-detail";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const saleRoutes = [
  {
    index: true,
    element: <Sale />,
  },
  {
    path: ":orderId/detail",
    element: <SaleDetail />,
  },
];
