import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layout";
import {
  Dashboard,
  ProductNew,
  ProductList,
  ProductView,
  ProductEdit,
  ProductQuestionAll,
  ProductQuestionList,
  Signin,
  Signup,
  Store,
  StoreNew,
  SaleList,
  SaleView,
} from "./pages";
import SellerProvider from "./seller.provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "product/new",
        element: <ProductNew />,
      },
      {
        path: "product/list",
        element: <ProductList />,
      },
      {
        path: "product/:id/view",
        element: <ProductView />,
      },
      {
        path: "product/:id/edit",
        element: <ProductEdit />,
      },
      {
        path: "product/question/all",
        element: <ProductQuestionAll />,
      },
      {
        path: "product/:id/question/list",
        element: <ProductQuestionList />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "store/new",
        element: <StoreNew />,
      },
      {
        path: "sale/list",
        element: <SaleList />,
      },
      {
        path: "sale/:id/view",
        element: <SaleView />,
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
