// eslint-disable-next-line no-unused-vars
const express = require("express");
const { OrderItem, Order, Product } = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} itemId
 */
const validateItemId = async (req, _res, next, itemId) => {
  const { userId } = req.auth;

  try {
    const item = await OrderItem.model.findByPk(itemId, {
      include: [
        {
          model: Order.model,
          as: "order",
          where: {
            customerId: userId,
          },
        },
        {
          model: Product.model,
          as: "product",
        },
      ],
    });
    if (!item) {
      throw notFound("Order Item not found");
    }

    req.item = item;
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
const findItem = async (req, res, next) => {
  const { item } = req;

  try {
    res.json(item);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateItemId,
  findItem,
};
