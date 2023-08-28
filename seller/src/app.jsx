import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout";
import {
  Dashboard,
  ProductNew,
  ProductList,
  ProductView,
  ProductEdit,
  ProductQuestion,
  ProductQuestionList,
  Signin,
  Signup,
  Store,
  StoreNew,
  SaleList,
  SaleView,
  ReviewList,
  ProductStockAlert,
} from "./pages";
import SellerProvider from "./seller.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ProductList />,
          },
          {
            path: "new",
            element: <ProductNew />,
          },
          {
            path: "question",
            element: <ProductQuestion />,
          },
          {
            path: "stock-alert",
            element: <ProductStockAlert />,
          },
          {
            path: ":id/view",
            element: <ProductView />,
          },
          {
            path: ":id/edit",
            element: <ProductEdit />,
          },
          {
            path: ":id/question",
            element: <ProductQuestionList />,
          },
        ],
      },
      {
        path: "store",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Store />,
          },
          {
            path: "new",
            element: <StoreNew />,
          },
        ],
      },
      {
        path: "sale",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SaleList />,
          },
          {
            path: ":id/view",
            element: <SaleView />,
          },
        ],
      },
      {
        path: "review",
        element: <Outlet />,
        children: [
          /*
            - Mostrar una vista con todos mis productos y la cantidad de reviews
            - Mostrar una vista con las reviews de un solo producto
            - Mostrar una vista las reviews que van haciendo los usuarios
          */
          {
            index: true,
            element: <ReviewList />,
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <SellerProvider>
      <RouterProvider router={router} />
    </SellerProvider>
  );
}

export default App;
