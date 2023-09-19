import { ProductList } from "../product";
import Dashboard from "./dashboard";

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
    element: <ProductList />,
  },
];

export default SellerRoutes;
