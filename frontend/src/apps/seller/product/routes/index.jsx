import ProductDetail from "../pages/product-detail";
import ProductList from "../pages/product-list";
import ProductNew from "../pages/product-new";
import ProductStockAlert from "../pages/product-stock-alert";

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
    path: ":productId/detail",
    element: <ProductDetail />,
  },
];
