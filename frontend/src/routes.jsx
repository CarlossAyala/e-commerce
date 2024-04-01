import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute, RedirectIfAuthenticated } from "./components";
import { CustomerRoot, customerRoutes } from "./apps/e-commerce";
import { AdminRoot, adminRoutes } from "./apps/admin";
import { SellerRoot, sellerRoutes } from "./apps/seller";
import { Portal, Signin, Signup } from "./shared/components";

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
    path: "/portal",
    element: (
      <AuthenticatedRoute>
        <Portal />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <RedirectIfAuthenticated>
        <Signin />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "/signup",
    element: (
      <RedirectIfAuthenticated>
        <Signup />
      </RedirectIfAuthenticated>
    ),
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
