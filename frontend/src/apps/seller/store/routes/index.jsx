import { WithStore, WithoutStore } from "../../utils";
import Store from "../pages/store";
import StoreNew from "../pages/store-new";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const storeRoutes = [
  {
    index: true,
    element: <WithStore component={Store} />,
  },
  {
    path: "new",
    element: <WithoutStore component={StoreNew} />,
  },
];
