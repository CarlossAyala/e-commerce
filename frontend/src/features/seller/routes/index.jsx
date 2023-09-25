import { Outlet } from "react-router-dom";
import { productRoutes } from "../product";
import { questionRoutes } from "../question";
import { storeRoutes } from "../store";
import { saleRoutes } from "../sale";
import { reviewRoutes } from "../review";
import { Dashboard } from "../dashboard";

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
  {
    path: "review",
    element: <Outlet />,
    children: reviewRoutes,
  },
];

export default SellerRoutes;
