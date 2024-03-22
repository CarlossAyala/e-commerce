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
import { QA } from "./features/qa";

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
    element: <Cart />,
  },
  {
    path: "checkout",
    element: <CheckoutProvider />,
    children: checkoutRoutes,
  },
  {
    path: "settings",
    element: <Settings />,
    children: settingRoutes,
  },
  {
    path: "orders",
    element: <Outlet />,
    children: orderRoutes,
  },
  {
    path: "qa",
    element: <QA />,
  },
  {
    path: "reviews",
    element: <Outlet />,
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
