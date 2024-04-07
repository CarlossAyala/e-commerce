// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const { Store, User } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} storeId
 */
const validateStoreId = async (req, _res, next, storeId) => {
  try {
    const store = await Store.model.findByPk(storeId, {
      include: {
        model: User.model,
        as: "seller",
      },
    });
    if (!store) {
      throw notFound("Store not found");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike("name", req.query.q)
    .orderBy("name", "ASC")
    .pagination()
    .build();

  try {
    const stores = await Store.model.findAndCountAll({
      ...qb,
      include: {
        model: User.model,
        as: "seller",
      },
    });

    res.json(stores);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findOne = async (req, res, next) => {
  const { store } = req;

  try {
    res.json(store);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateStoreId,
  findAll,
  findOne,
};
