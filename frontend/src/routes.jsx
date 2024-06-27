import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SocketProvider } from "./shared/socket";
import {
  AuthenticatedRoute,
  NotFound,
  Signin,
  Signup,
} from "./shared/components";
import {
  CustomerRoot,
  SocketEventHandler as EcommerceSocketEventHandler,
  customerRoutes,
} from "./apps/e-commerce";
import { AdminRoot, adminRoutes } from "./apps/admin";
import {
  SellerRoot,
  SocketEventHandler as StoreSocketEventHandler,
  sellerRoutes,
} from "./apps/seller";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SocketProvider>
        <EcommerceSocketEventHandler>
          <CustomerRoot />
        </EcommerceSocketEventHandler>
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
          <StoreSocketEventHandler>
            <SellerRoot />
          </StoreSocketEventHandler>
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

export const Routes = () => {
  return <RouterProvider router={router} />;
};
