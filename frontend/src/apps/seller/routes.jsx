import { Outlet } from "react-router-dom";
import { RedirectWithStore, WithStoreRoute } from "./components";
import { productRoutes } from "./features/product";
import { Store, StoreNew } from "./features/store";
import { Dashboard } from "./features/dashboard";
import { qaRoutes } from "./features/qa";
import { orderRoutes } from "./features/order";
import { reviewRoutes } from "./features/review";

/**
 * @type {import("react-router-dom").RouteObject[]}
 *
 */
export const sellerRoutes = [
  {
    index: true,
    element: (
      <WithStoreRoute>
        <Dashboard />
      </WithStoreRoute>
    ),
  },
  {
    path: "create",
    element: (
      <RedirectWithStore>
        <StoreNew />,
      </RedirectWithStore>
    ),
  },
  {
    path: "store",
    element: (
      <WithStoreRoute>
        <Store />
      </WithStoreRoute>
    ),
  },
  {
    path: "products",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: productRoutes,
  },
  {
    path: "qa",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: qaRoutes,
  },
  {
    path: "orders",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: orderRoutes,
  },
  {
    path: "reviews",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: reviewRoutes,
  },
];
