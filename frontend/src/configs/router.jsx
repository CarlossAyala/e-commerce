import { createBrowserRouter } from "react-router-dom";
import { CustomerRoot, customerRoutes } from "../apps/ecommerce";
import { AdminRoot, adminRoutes } from "../apps/admin";
import { SellerRoot, sellerRoutes } from "../apps/seller";
import { SocketProvider } from "../features/socket";
import {
  AuthenticatedRoute,
  NotFound,
  Signin,
  Signup,
} from "../shared/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SocketProvider>
        <CustomerRoot />
      </SocketProvider>
    ),
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
        <SocketProvider>
          <SellerRoot />
        </SocketProvider>
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
