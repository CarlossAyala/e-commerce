import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "../layouts";
import { Signin, Signout, Signup } from "../components";
import { WithLoggedIn, WithLoggedOut } from "../libs/auth";
import { SellerRoot, sellerRoutes } from "../apps/seller";
import { CustomerRoot, customerRoutes } from "../apps/customer";
import { AdminRoot, adminRoutes } from "../apps/admin";
import { WithAdminAuth } from "../apps/admin";

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
        element: <WithAdminAuth component={AdminRoot} />,
        children: adminRoutes,
      },
      {
        path: "customer",
        element: <CustomerRoot />,
        children: customerRoutes,
      },
      {
        path: "seller",
        element: <WithLoggedIn component={SellerRoot} />,
        children: sellerRoutes,
      },
      {
        path: "signin",
        element: <WithLoggedOut component={Signin} />,
      },
      {
        path: "signup",
        element: <WithLoggedOut component={Signup} />,
      },
      {
        path: "signout",
        element: <WithLoggedIn component={Signout} />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
