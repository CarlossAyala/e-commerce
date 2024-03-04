// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Op } = require("sequelize");
const { notFound } = require("../../../middlewares");
const { QueryBuilder } = require("../../../libs");
const {
  Review,
  OrderItem,
  Order,
  Product,
} = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} orderItemId
 */
const validateOrderItemId = async (req, _res, next, orderItemId) => {
  const { userId } = req.auth;

  try {
    const orderItem = await OrderItem.model.findByPk(orderItemId, {
      include: {
        model: Order.model,
        as: "order",
        where: {
          customerId: userId,
        },
      },
    });
    if (!orderItem) {
      throw notFound("Order item not found");
    }

    req.orderItem = orderItem;
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
const findAllDone = async (req, res, next) => {
  const { userId } = req.auth;

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  const { where: whereProduct } = new QueryBuilder()
    .whereLike("name", req.query.q)
    .build();

  try {
    const reviews = await Review.model.findAndCountAll({
      include: {
        model: OrderItem.model,
        as: "item",
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
            where: whereProduct,
          },
        ],
      },
      order,
      limit,
      offset,
    });

    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAllPending = async (req, res, next) => {
  const { userId } = req.auth;

  const { where: whereProduct } = new QueryBuilder()
    .whereLike("name", req.query.q)
    .build();

  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const reviews = await OrderItem.model.findAndCountAll({
      where: {
        reviewId: {
          [Op.is]: null,
        },
      },
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
          where: whereProduct,
        },
      ],
      order,
      limit,
      offset,
    });

    res.json(reviews);
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
  const { orderItem, body } = req;

  try {
    const review = await Review.model.create(body);
    await orderItem.update({
      reviewId: review.id,
    });

    res.json(review);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateOrderItemId,
  findAllDone,
  findAllPending,
  create,
};
