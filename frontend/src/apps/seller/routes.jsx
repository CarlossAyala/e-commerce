import { Outlet } from "react-router-dom";
import { productRoutes } from "./product";
import { questionRoutes } from "./question";
import { Store, StoreNew } from "./features/store";
import { saleRoutes } from "./sale";
import { reviewRoutes } from "./review";
import { Dashboard } from "./features/dashboard";
import { RedirectWithStore, WithStoreRoute } from "./components";

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
    path: "product",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: productRoutes,
  },
  {
    path: "question",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: questionRoutes,
  },
  {
    path: "sale",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: saleRoutes,
  },
  {
    path: "review",
    element: (
      <WithStoreRoute>
        <Outlet />
      </WithStoreRoute>
    ),
    children: reviewRoutes,
  },
];
