import { AddressDetails, AddressNew, Addresses } from "./pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const addressRoutes = [
  {
    index: true,
    element: <Addresses />,
  },
  {
    path: "new",
    element: <AddressNew />,
  },
  {
    path: ":addressId/details",
    element: <AddressDetails />,
  },
];
