import {
  AttachCategory,
  CategoriesOverview,
  CategoryDetails,
  DetachCategory,
  NewCategory,
} from "../pages";

/**
 * @type {import("react-router-dom").RouteObject[]}
 */
export const categoriesRoutes = [
  {
    index: true,
    element: <CategoriesOverview />,
  },
  {
    path: "new",
    element: <NewCategory />,
  },
  {
    path: "attach",
    element: <AttachCategory />,
  },
  {
    path: "detach",
    element: <DetachCategory />,
  },
  {
    path: ":categoryId/details",
    element: <CategoryDetails />,
  },
];
