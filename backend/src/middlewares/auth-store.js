// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Store } = require("../database/mysql/models");
const { badRequest } = require("./http-errors");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const authStore = async (req, _res, next) => {
  const { userId } = req.auth;

  try {
    const store = await Store.model.findOne({
      where: { sellerId: userId },
    });
    if (!store) {
      throw badRequest("You are not authorized to perform this action");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authStore;
