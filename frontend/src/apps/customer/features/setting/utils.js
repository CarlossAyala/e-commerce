import { addressActionRoutes } from "../address";

export const settingActionRoutes = {
  base: "/customer/settings",
  profile: "/customer/settings",
  account: "/customer/settings/account",
  cards: "/customer/settings/cards",
  addresses: addressActionRoutes.root,
};

export const settingsNav = [
  {
    name: "Profile",
    to: settingActionRoutes.profile,
  },
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
