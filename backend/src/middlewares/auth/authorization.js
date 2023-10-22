// eslint-disable-next-line no-unused-vars
const express = require("express");
const Boom = require("@hapi/boom");
const { Roles, User } = require("../../database/mysql/models");

/**
 * @param {string} role
 */
const authorization = (roles) => {
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return async (req, res, next) => {
    const { id: userId } = req.auth;

    try {
      const userRoles = await User.model.findByPk(userId, {
        include: {
          model: Roles.model,
          as: "roles",
        },
      });

      const hasPermission = userRoles.dataValues.roles.every((role) =>
        roles.includes(role.name)
      );
      if (!hasPermission) {
        throw Boom.unauthorized();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorization;
