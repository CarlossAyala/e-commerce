import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root, RootSeller } from "../layouts";
import { Signin, Signup } from "../components";
import SellerRoutes from "../features/seller/routes";

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
        element: <RootSeller />,
        children: SellerRoutes,
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

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;