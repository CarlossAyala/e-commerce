// eslint-disable-next-line no-unused-vars
const express = require("express");
const {
  Order,
  OrderItem,
  Product,
  Address,
} = require("../../../database/mysql/models");
const { notFound } = require("../../../middlewares");
const { QueryBuilder, Stripe } = require("../../../libs");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} orderId
 */
const validateOrderId = async (req, _res, next, orderId) => {
  const { userId } = req.auth;

  try {
    const order = await Order.model.findByPk(orderId, {
      raw: true,
    });
    if (!order || order.customerId !== userId) {
      throw notFound("Order not found");
    }

    req.order = order;
    next();
  } catch (error) {
    next(error);
  }
};

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
const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const qb = new QueryBuilder(req.query)
    .where("customerId", userId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const orders = await Order.model.findAndCountAll({
      ...qb,
      include: [
        {
          model: OrderItem.model,
          as: "items",
          include: {
            model: Product.model,
            as: "product",
          },
        },
        {
          model: Address.model,
          as: "address",
        },
      ],
      distinct: true,
    });

    res.json(orders);
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
  const { order } = req;

  try {
    const address = await Address.model.findByPk(order.addressId, {
      raw: true,
    });

    const items = await OrderItem.model.findAll({
      where: {
        orderId: order.id,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });

    const paymentIntent = await Stripe.paymentIntents.retrieve(
      order.paymentIntentId
    );

    const paymentMethod = await Stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );

    res.json({
      order,
      address,
      items,
      paymentIntent,
      paymentMethod,
    });
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
  validateOrderId,
  validateItemId,
  findAll,
  findOne,
  findItem,
};
