import {
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  ClipboardIcon,
  CubeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const SIDE_NAV = [
  {
    name: "Dashboard",
    icon: SparklesIcon,
    to: "/seller",
  },
  {
    name: "Store",
    icon: BuildingStorefrontIcon,
    to: "/seller/store",
  },
  {
    name: "Product",
    icon: CubeIcon,
    to: "/seller/products",
    subNav: [
      { name: "List", to: "/seller/products" },
      { name: "Create", to: "/seller/products/new" },
    ],
  },
  {
    name: "Questions",
    icon: QuestionMarkCircleIcon,
    to: "/seller/questions",
  },
  {
    name: "Orders",
    icon: ClipboardIcon,
    to: "/seller/orders",
  },
  {
    name: "Reviews",
    icon: ChatBubbleLeftRightIcon,
    to: "/seller/reviews",
  },
];
