import { NotFound } from "@/shared/components";
import { productRoutes } from "./features/products";
import { Store, StoreNew } from "./features/store";
import { Dashboard } from "./features/dashboard";
import { questionRoutes } from "./features/questions";
import { orderRoutes } from "./features/orders";
import { reviewRoutes } from "./features/reviews";
import { RedirectWithStore, WithStoreRoute } from "./components";
import { Chats, chatRoutes } from "./features/chats";

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
    element: <WithStoreRoute />,
    children: productRoutes,
  },
  {
    path: "questions",
    element: <WithStoreRoute />,
    children: questionRoutes,
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
  {
    path: "chats",
    element: (
      <WithStoreRoute>
        <Chats />
      </WithStoreRoute>
    ),
    children: chatRoutes,
  },
  {
    path: "*",
    element: <NotFound className="flex-1" />,
  },
];
