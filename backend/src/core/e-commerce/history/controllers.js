// eslint-disable-next-line no-unused-vars
const express = require("express");
const { QueryBuilder } = require("../../../libs");
const { History, Product } = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("lastSeenAt", "DESC")
    .pagination()
    .build();

  try {
    const history = await History.model.findAndCountAll({
      where: {
        customerId: userId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
      order,
      limit,
      offset,
    });

    res.json(history);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    const history = await History.model.findOne({
      where: {
        customerId: userId,
        productId,
      },
    });

    if (!history) {
      await History.model.create({
        customerId: userId,
        productId,
      });

      res.json({ message: "History created" });
    } else {
      await history.update({ lastSeenAt: new Date() });

      res.json({ message: "History updated" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const clear = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    await History.model.destroy({
      where: {
        customerId: userId,
      },
    });

    res.json({ message: "History cleared" });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const remove = async (req, res, next) => {
  const { userId } = req.auth;
  const { productId } = req.params;

  try {
    await History.model.destroy({
      where: {
        customerId: userId,
        productId,
      },
    });

    res.json({ message: "History removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  create,
  clear,
  remove,
};
