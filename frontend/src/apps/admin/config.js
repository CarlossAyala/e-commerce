import {
  BuildingStorefrontIcon,
  SparklesIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export const NAVS = {
  DASHBOARD: {
    label: "Dashboard",
    to: "/admin",
    name: "dashboard",
  },
  CATEGORIES: {
    label: "Categories",
    to: "/admin/categories",
    name: "categories",
  },
  STORES: {
    label: "Stores",
    to: "/admin/stores",
    name: "stores",
  },
};

export const SIDE_NAV = [
  { ...NAVS.DASHBOARD, icon: SparklesIcon },
  {
    ...NAVS.CATEGORIES,
    icon: Square3Stack3DIcon,
    subItems: [
      { label: "Overview", to: NAVS.CATEGORIES.to },
      { label: "Create", to: `${NAVS.CATEGORIES.to}/create` },
      {
        label: "Attach",
        to: `${NAVS.CATEGORIES.to}/attach`,
      },
      {
        label: "Detach",
        to: `${NAVS.CATEGORIES.to}/detach`,
      },
    ],
  },
  { ...NAVS.STORES, icon: BuildingStorefrontIcon },
];
