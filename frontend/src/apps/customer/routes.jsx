import { Outlet } from "react-router-dom";
import { AuthenticatedRoute } from "@/components";
import { Bookmarks } from "./features/bookmark";
import { History } from "./features/history";
import { Home } from "./features/home";
import { productRoutes } from "./features/product";
import { Cart } from "./features/cart";
import { checkoutRoutes } from "./features/checkout";
import { Settings, settingRoutes } from "./features/setting";
import { orderRoutes } from "./features/order";
import { reviewRoutes } from "./features/review";
import { storeRoutes } from "./features/store";
import { categoryRoutes } from "./features/category";
import { CheckoutProvider } from "./features/checkout";
import { Questions } from "./features/qa";

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
    path: "cart",
    element: (
      <AuthenticatedRoute>
        <Cart />
      </AuthenticatedRoute>
    ),
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
];
