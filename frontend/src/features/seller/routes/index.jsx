import { Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { productRoutes } from "../product";
import { questionRoutes } from "../question";

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
  {
    path: "question",
    element: <Outlet />,
    children: questionRoutes,
  },
];

export default SellerRoutes;
