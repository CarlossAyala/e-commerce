import {
  CheckBadgeIcon,
  ListBulletIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { adminPermissions } from "../permissions";
import { dashboardActionRoutes } from "../features";

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
    to: "/admin/categories",
    icon: ListBulletIcon,
  },
  {
    name: "Official Stores",
    to: "/admin/official-stores",
    icon: CheckBadgeIcon,
  },
];
