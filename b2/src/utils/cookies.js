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

const getRefreshTokenConfig = () => {
  return {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: ms(jwt.refresh_token.expire),
    expires: new Date(Date.now() + ms(jwt.refresh_token.expire)),
  };
};
const clearRefreshToken = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

module.exports = {
  getRefreshTokenConfig,
  clearRefreshToken,
  getCookieName,
};
