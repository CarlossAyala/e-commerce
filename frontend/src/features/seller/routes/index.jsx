import { Outlet } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { productRoutes } from "../product";
import { questionRoutes } from "../question";
import { storeRoutes } from "../store";
import { saleRoutes } from "../sale";

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
  {
    path: "sale",
    element: <Outlet />,
    children: saleRoutes,
  },
];

export default SellerRoutes;
