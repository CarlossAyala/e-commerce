import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./layouts";
import { Signin, Signup } from "./components";
import { SellerRoot, sellerRoutes } from "./apps/seller";
import { CustomerRoot, customerRoutes } from "./apps/customer";
import { AdminRoot, adminRoutes } from "./apps/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "admin",
        element: <AdminRoot />,
        children: adminRoutes,
      },
      {
        path: "customer",
        element: <CustomerRoot />,
        children: customerRoutes,
      },
      {
        path: "seller",
        element: <SellerRoot />,
        children: sellerRoutes,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
