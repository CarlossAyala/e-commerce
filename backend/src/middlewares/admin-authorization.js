// eslint-disable-next-line no-unused-vars
const express = require("express");
const { unauthorized } = require("./http-errors");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const adminAuthentication = async (req, _res, next) => {
  const { user } = req;

  try {
    if (!user.isAdmin) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminAuthentication;
