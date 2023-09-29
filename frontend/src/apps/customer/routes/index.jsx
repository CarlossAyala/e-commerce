import { Bookmark } from "../features/bookmark";
import { History } from "../features/history";
import { Home } from "../features/home";
import { Product } from "../features/product";

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
];
