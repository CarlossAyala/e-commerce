import { Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { productRoutes } from "../product/routes";

/**
 * @type {import("react-router-dom").RouteObject[]}
 *
 */
const SellerRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "product",
    element: <Outlet />,
    children: productRoutes,
  },
];

export default SellerRoutes;
