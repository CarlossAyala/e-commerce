import { addressActionRoutes } from "../address";

export const settingActionRoutes = {
  base: "/settings",
  account: "/settings",
  cards: "/settings/cards",
  addresses: addressActionRoutes.root,
};

export const settingsNav = [
  {
    name: "Account",
    to: settingActionRoutes.account,
  },
  {
    name: "Cards",
    to: settingActionRoutes.cards,
  },
  {
    name: "Addresses",
    to: settingActionRoutes.addresses,
  },
];
