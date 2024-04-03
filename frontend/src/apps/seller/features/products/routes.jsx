import { ProductDetails, ProductList, ProductNew } from "./pages";

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
    path: ":productId/details",
    element: <ProductDetails />,
  },
];
