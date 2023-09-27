import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "../layouts";
import { Signin, Signout, Signup } from "../components";
import SellerRoutes from "../features/seller/routes";
import { RootSeller } from "../features/seller/layout";
import { WithLoggedIn, WithLoggedOut } from "../libs/auth";

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
        path: "seller",
        element: <WithLoggedIn component={RootSeller} />,
        children: SellerRoutes,
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
