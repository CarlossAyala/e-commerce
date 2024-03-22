import { Product, Products } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const productRoutes = [
  {
    index: true,
    element: <Products />,
  },
  {
    path: ":productId/:name",
    element: <Product />,
  },
];
