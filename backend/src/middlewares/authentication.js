// eslint-disable-next-line no-unused-vars
const express = require("express");
const { unauthorized } = require("./http-errors");
const { User } = require("../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const authentication = async (req, _res, next) => {
  const { userId } = req.auth;

  try {
    const user = await User.model.findByPk(userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      throw unauthorized("You are not authorized to access this resource.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
