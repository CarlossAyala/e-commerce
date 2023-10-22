// eslint-disable-next-line no-unused-vars
const express = require("express");
const Boom = require("@hapi/boom");
const { User } = require("../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const authentication = async (req, res, next) => {
  const { id: userId } = req.auth;

  try {
    const account = await User.model.findByPk(userId);
    if (!account) {
      throw Boom.unauthorized();
    }

    req.account = account;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
