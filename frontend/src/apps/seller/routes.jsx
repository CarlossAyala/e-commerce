import { RedirectWithStore, WithStoreRoute } from "./components";
import { productRoutes } from "./features/products";
import { StoreNew, storeRoutes } from "./features/store";
import { Dashboard } from "./features/dashboard";
import { qaRoutes } from "./features/qa";
import { orderRoutes } from "./features/orders";
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
    element: <WithStoreRoute />,
    children: storeRoutes,
  },
  {
    path: "products",
    element: <WithStoreRoute />,
    children: productRoutes,
  },
  {
    path: "qa",
    element: <WithStoreRoute />,
    children: qaRoutes,
  },
  {
    path: "orders",
    element: <WithStoreRoute />,
    children: orderRoutes,
  },
  {
    path: "reviews",
    element: <WithStoreRoute />,
    children: reviewRoutes,
  },
];
