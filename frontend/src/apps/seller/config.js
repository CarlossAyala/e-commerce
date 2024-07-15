import {
  BuildingStorefrontIcon,
  ChatBubbleBottomCenterIcon,
  ClipboardIcon,
  CubeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export const SIDE_NAV = [
  {
    label: "Dashboard",
    icon: SparklesIcon,
    to: "/seller",
    name: "dashboard",
  },
  {
    label: "Store",
    icon: BuildingStorefrontIcon,
    to: "/seller/store",
    name: "store",
  },
  {
    label: "Product",
    icon: CubeIcon,
    to: "/seller/products",
    name: "products",
    subNav: [
      { label: "List", to: "/seller/products" },
      { label: "Create", to: "/seller/products/new" },
    ],
  },
  {
    label: "Questions",
    icon: QuestionMarkCircleIcon,
    to: "/seller/questions",
    name: "questions",
  },
  {
    label: "Orders",
    icon: ClipboardIcon,
    to: "/seller/orders",
    name: "orders",
  },
  {
    label: "Reviews",
    icon: StarIcon,
    to: "/seller/reviews",
    name: "reviews",
  },
  {
    label: "Chats",
    icon: ChatBubbleBottomCenterIcon,
    to: "/seller/chats",
    name: "chats",
  },
];
