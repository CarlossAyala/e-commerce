import Store from "../pages/store";
import StoreNew from "../pages/store-new";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <Store />,
  },
  {
    path: "new",
    element: <StoreNew />,
  },
];
