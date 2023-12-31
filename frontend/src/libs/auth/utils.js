/**
 * @typedef {("admin"|"seller"|"customer")} Profile
 */

export const authActionRoutes = {
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
};

const PROFILES = {
  admin: "from=admin",
  seller: "from=seller",
  customer: "from=customer",
};

/**
 *
 * @param {Profile} profile
 */
export const getProfileQuery = (profile) => {
  return PROFILES[profile] ?? PROFILES.customer;
};
