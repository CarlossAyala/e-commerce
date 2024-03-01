import { Outlet } from "react-router-dom";
import { RedirectWithStore, WithStoreRoute } from "./components";
import { productRoutes } from "./features/product";
import { Store, StoreNew } from "./features/store";
import { Dashboard } from "./features/dashboard";
import { questionRoutes } from "./features/question";
import { saleRoutes } from "./features/sale";
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
    path: "questions",
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
