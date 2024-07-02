import { Outlet } from "react-router-dom";
import { AuthenticatedRoute } from "@/shared/components";
import { Bookmarks } from "./features/bookmark";
import { History } from "./features/history";
import { Home } from "./features/home";
import { productRoutes } from "./features/products";
import { checkoutRoutes } from "./features/checkout";
import { Settings, settingRoutes } from "./features/setting";
import { orderRoutes } from "./features/orders";
import { reviewRoutes } from "./features/review";
import { storeRoutes } from "./features/stores";
import { categoryRoutes } from "./features/categories";
import { CheckoutProvider } from "./features/checkout";
import { Questions } from "./features/questions";
import { Chats, chatRoutes } from "./features/chats";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const customerRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "history",
    element: (
      <AuthenticatedRoute>
        <History />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "bookmarks",
    element: (
      <AuthenticatedRoute>
        <Bookmarks />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "products",
    element: <Outlet />,
    children: productRoutes,
  },
  {
    path: "checkout",
    element: (
      <AuthenticatedRoute>
        <CheckoutProvider />
      </AuthenticatedRoute>
    ),
    children: checkoutRoutes,
  },
  {
    path: "settings",
    element: (
      <AuthenticatedRoute>
        <Settings />
      </AuthenticatedRoute>
    ),
    children: settingRoutes,
  },
  {
    path: "orders",
    element: <AuthenticatedRoute />,
    children: orderRoutes,
  },
  {
    path: "questions",
    element: (
      <AuthenticatedRoute>
        <Questions />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "reviews",
    element: <AuthenticatedRoute />,
    children: reviewRoutes,
  },
  {
    path: "stores",
    element: <Outlet />,
    children: storeRoutes,
  },
  {
    path: "categories",
    element: <Outlet />,
    children: categoryRoutes,
  },
  {
    path: "chats",
    element: (
      <AuthenticatedRoute>
        <Chats />
      </AuthenticatedRoute>
    ),
    children: chatRoutes,
  },
];
