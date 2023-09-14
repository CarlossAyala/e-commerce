import { Outlet } from "react-router-dom";

const PATH_ROUTE = ["", "seller", "user"].join("/");

// export const reviewRoutes = {
//   path: "review",
//   element: <Outlet />,
//   children: [
//     {
//       index: true,
//       element: <h1>Review Overview</h1>,
//     },
//     {
//       path: "timeline",
//       element: <h1>Review Timeline</h1>,
//     },
//     {
//       path: ":id/list",
//       element: <h1>Review List</h1>,
//     },
//   ],
// };

export const userLoggedInNavigation = [
  [
    {
      label: "Profile",
      to: `${PATH_ROUTE}/profile`,
    },
  ],
  [
    {
      label: "Sign out",
      to: `${PATH_ROUTE}/sign-out`,
    },
  ],
];

export const userGuestNavigation = [
  [
    {
      label: "Sign in",
      to: `${PATH_ROUTE}/sign-in`,
    },
    {
      label: "Sign up",
      to: `${PATH_ROUTE}/sign-up`,
    },
  ],
];

// export const reviewActionRoutes = {
//   overview: PATH_ROUTE,
//   timeline: `${PATH_ROUTE}/timeline`,
//   list: (id) => `${PATH_ROUTE}/${id}/list`,
// };
