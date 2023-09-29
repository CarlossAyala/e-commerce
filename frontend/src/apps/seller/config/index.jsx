import {
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  CubeIcon,
  QuestionMarkCircleIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

export const navigation = {
  mainNav: [
    {
      title: "Dashboard",
      icon: SquaresPlusIcon,
      to: "/seller",
    },
    {
      title: "Products",
      icon: CubeIcon,
      items: [
        {
          title: "List",
          to: "/seller/product",
        },
        {
          title: "New",
          to: "/seller/product/new",
        },
        {
          title: "Stock Alert",
          to: "/seller/product/stock-alert",
        },
      ],
    },
    {
      title: "Questions",
      icon: QuestionMarkCircleIcon,
      to: "/seller/question",
    },
    {
      title: "Sales",
      icon: BanknotesIcon,
      to: "/seller/sale",
    },
    {
      title: "Reviews",
      icon: ChatBubbleLeftRightIcon,
      items: [
        {
          title: "Overview",
          to: "/seller/review",
        },
        {
          title: "Timeline",
          to: "/seller/review/timeline",
        },
      ],
    },
  ],
};
