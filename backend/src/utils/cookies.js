const ms = require("ms");
const { jwt } = require("../config");

const APPS = {
  ecommerce: "ecommerce-refresh-token",
  admin: "admin-refresh-token",
  seller: "seller-refresh-token",
};

const getCookieName = (app) => {
  return APPS[app] ?? APPS["ecommerce"];
};

/**
 * @returns {import("express").CookieOptions} Cookie options
 */
const getRefreshTokenConfig = () => {
  return {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: ms(jwt.refresh_token.expire),
    expires: new Date(Date.now() + ms(jwt.refresh_token.expire)),
  };
};

/**
 * @type {import("express").CookieOptions}
 */
const clearRefreshToken = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
};

module.exports = {
  getRefreshTokenConfig,
  clearRefreshToken,
  getCookieName,
};
