import {
  ProductDetail,
  ProductList,
  ProductNew,
  ProductStockAlert,
} from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const productRoutes = [
  {
    index: true,
    element: <ProductList />,
  },
  {
    path: "new",
    element: <ProductNew />,
  },
  {
    path: "stock-alert",
    element: <ProductStockAlert />,
  },
  {
    path: ":productId/details",
    element: <ProductDetail />,
  },
];
