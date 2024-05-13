import ms from "ms";
import environments from "./environments.js";

/**
 * @type {import("express").CookieOptions}
 */
export const refreshTokenOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: ms(environments.jwt.refresh_token.expire),
  expires: new Date(Date.now() + ms(environments.jwt.refresh_token.expire)),
};

/**
 * @type {import("express").CookieOptions}
 */
export const clearRefreshTokenOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};
