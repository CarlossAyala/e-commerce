import { Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { productRoutes } from "../product";
import { questionRoutes } from "../question";
import { storeRoutes } from "../store";

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
  {
    path: "store",
    element: <Outlet />,
    children: storeRoutes,
  },
];

export default SellerRoutes;
