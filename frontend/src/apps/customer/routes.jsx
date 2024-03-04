import { Outlet } from "react-router-dom";
import { Bookmarks } from "./features/bookmark";
import { History } from "./features/history";
import { Home } from "./features/home";
import { productRoutes } from "./features/product";
import { addressRoutes } from "./features/address";
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
    element: <History />,
  },
  {
    path: "bookmarks",
    element: <Bookmarks />,
  },
  {
    path: "products",
    element: <Outlet />,
    children: productRoutes,
  },
  {
    path: "address",
    element: <Outlet />,
    children: addressRoutes,
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
