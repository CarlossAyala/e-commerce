import { Outlet } from "react-router-dom";
import { productRoutes } from "../product";
import { questionRoutes } from "../question";
import { storeRoutes } from "../store";
import { saleRoutes } from "../sale";
import { reviewRoutes } from "../review";
import { Dashboard } from "../dashboard";
import { WithStore } from "../utils";

/**
 * @type {import("react-router-dom").RouteObject[]}
 *
 */
export const sellerRoutes = [
  {
    index: true,
    element: <WithStore component={Dashboard} />,
  },
  {
    path: "product",
    element: <WithStore component={Outlet} />,
    children: productRoutes,
  },
  {
    path: "question",
    element: <WithStore component={Outlet} />,
    children: questionRoutes,
  },
  {
    path: "store",
    element: <Outlet />,
    children: storeRoutes,
  },
  {
    path: "sale",
    element: <WithStore component={Outlet} />,
    children: saleRoutes,
  },
  {
    path: "review",
    element: <WithStore component={Outlet} />,
    children: reviewRoutes,
  },
];
