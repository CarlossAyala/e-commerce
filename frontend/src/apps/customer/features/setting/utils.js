import { addressActionRoutes } from "../address";

export const settingActionRoutes = {
  base: "/customer/settings",
  account: "/customer/settings",
  cards: "/customer/settings/cards",
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
