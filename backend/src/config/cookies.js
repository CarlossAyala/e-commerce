/**
 * @type {import("express").CookieOptions}
 */
const refreshTokenOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
  // path: "/refresh_token", //TODO: Check path config
  maxAge: 24 * 60 * 60 * 1000, // 1d
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
};

/**
 * @type {import("express").CookieOptions}
 */
const clearRefreshTokenOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: true,
  // path: "/refresh_token", //TODO: Check path config
};

module.exports = {
  refreshTokenOptions,
  clearRefreshTokenOptions,
};
