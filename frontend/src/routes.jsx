import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AuthenticatedRoute,
  NotFound,
  Signin,
  Signup,
} from "./shared/components";
import { CustomerRoot, customerRoutes } from "./apps/e-commerce";
import { AdminRoot, adminRoutes } from "./apps/admin";
import { SellerRoot, sellerRoutes } from "./apps/seller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerRoot />,
    children: customerRoutes,
  },
  {
    path: "/admin",
    element: (
      <AuthenticatedRoute>
        <AdminRoot />
      </AuthenticatedRoute>
    ),
    children: adminRoutes,
  },
  {
    path: "/seller",
    element: (
      <AuthenticatedRoute>
        <SellerRoot />
      </AuthenticatedRoute>
    ),
    children: sellerRoutes,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound className="h-svh" />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
