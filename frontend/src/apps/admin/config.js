import {
  BuildingStorefrontIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export const NAVS = {
  DASHBOARD: {
    name: "Dashboard",
    to: "/admin",
  },
  CATEGORIES: {
    name: "Categories",
    to: "/admin/categories",
  },
  STORES: {
    name: "Stores",
    to: "/admin/stores",
  },
};

export const SIDE_NAV = [
  { ...NAVS.DASHBOARD, icon: SparklesIcon },
  {
    ...NAVS.CATEGORIES,
    icon: Square3Stack3DIcon,
    subItems: [
      { name: "Overview", to: NAVS.CATEGORIES.to },
      { name: "Create", to: `${NAVS.CATEGORIES.to}/create` },
      {
        name: "Attach",
        to: `${NAVS.CATEGORIES.to}/attach`,
      },
      {
        name: "Detach",
        to: `${NAVS.CATEGORIES.to}/detach`,
      },
    ],
  },
  { ...NAVS.STORES, icon: BuildingStorefrontIcon },
];
