/**
 * @type {import("express").CookieOptions}
 */
const refreshTokenOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000, // 1d
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1d
};

/**
 * @type {import("express").CookieOptions}
 */
const clearRefreshTokenOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

module.exports = {
  refreshTokenOptions,
  clearRefreshTokenOptions,
};
