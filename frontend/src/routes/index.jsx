import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root, RootSeller } from "../layouts";
import { Dashboard } from "../features/seller/dashboard";
import { Signin, Signup } from "../components";

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
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
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
