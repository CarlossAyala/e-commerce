import ProductDetails from "../pages/product-details";
import ProductList from "../pages/product-list";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const productRoutes = [
  {
    index: true,
    element: <ProductList />,
  },
  {
    path: ":id/detail",
    element: <ProductDetails />,
  },
];
