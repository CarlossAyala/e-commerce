import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./layouts";
import {
  AuthenticatedRoute,
  RedirectIfAuthenticated,
  Signin,
  Signup,
} from "./components";
import { CustomerRoot, customerRoutes } from "./apps/customer";
import { AdminRoot, adminRoutes } from "./apps/admin";
import { SellerRoot, sellerRoutes } from "./apps/seller";

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
        element: (
          <AuthenticatedRoute>
            <SellerRoot />
          </AuthenticatedRoute>
        ),
        children: sellerRoutes,
      },
      {
        path: "signin",
        element: (
          <RedirectIfAuthenticated>
            <Signin />
          </RedirectIfAuthenticated>
        ),
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
