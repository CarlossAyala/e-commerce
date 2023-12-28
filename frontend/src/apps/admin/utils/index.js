import {
  CheckBadgeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { adminPermissions } from "../permissions";
import { categoryActionRoutes, dashboardActionRoutes } from "../features";

export const hasAdminRoles = (roles) => {
  if (!roles || !Array.isArray(roles)) return false;

  return roles.some((role) => adminPermissions.includes(role.name));
};

export const adminAsideNavigation = [
  {
    name: "Dashboard",
    to: dashboardActionRoutes.root,
    icon: Squares2X2Icon,
  },
  {
    name: "Categories",
    icon: ListBulletIcon,
    subRoutes: [
      { name: "Overview", to: categoryActionRoutes.root },
      {
        name: "New",
        to: categoryActionRoutes.new,
      },
      {
        name: "Attach",
        to: categoryActionRoutes.attach,
      },
      {
        name: "Detach",
        to: categoryActionRoutes.detach,
      },
    ],
  },
  {
    name: "Request Official Stores",
    to: "/admin/request-official-stores",
    icon: CheckBadgeIcon,
  },
];
