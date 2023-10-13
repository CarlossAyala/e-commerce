import { Outlet } from "react-router-dom";
import { Bookmark } from "../features/bookmark";
import { History } from "../features/history";
import { Home } from "../features/home";
import { Product } from "../features/product";
import { addressRoutes } from "../features/address";
import { Cart } from "../features/cart";
import { checkoutRoutes } from "../features/checkout";
import { Settings, settingRoutes } from "../features/setting";
import { orderRoutes } from "../features/order";
import { Questions } from "../features/question";
import { reviewRoutes } from "../features/review";
import { storeRoutes } from "../features/store";

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
    // element: <WithLoggedIn component={History} />,
    element: <History />,
  },
  {
    path: "bookmark",
    // element: <WithLoggedIn component={History} />,
    element: <Bookmark />,
  },
  {
    path: "product/:productId/:slug",
    element: <Product />,
  },
  {
    path: "address",
    // element: <WithLoggedIn component={History} />,
    element: <Outlet />,
    children: addressRoutes,
  },
  {
    path: "cart",
    element: <Cart />,
  },
  {
    path: "checkout",
    element: <Outlet />,
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
    path: "questions",
    element: <Questions />,
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
];
