import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout";
import {
  Dashboard,
  ProductEdit,
  ProductList,
  ProductNew,
  ProductStockAlert,
  ProductView,
  QuestionList,
  QuestionOverview,
  ReviewList,
  ReviewOverview,
  ReviewTimeline,
  SaleList,
  SaleView,
  Signin,
  Signup,
  Store,
  StoreNew,
} from "../pages";

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
        ],
      },
      {
        path: "question",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <QuestionOverview />,
          },
          {
            path: ":id/list",
            element: <QuestionList />,
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
          {
            index: true,
            element: <ReviewOverview />,
          },
          {
            path: "timeline",
            element: <ReviewTimeline />,
          },
          {
            path: ":id/list",
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

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
