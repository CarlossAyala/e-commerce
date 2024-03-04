// eslint-disable-next-line no-unused-vars
const express = require("express");
const { notFound } = require("../../../middlewares");
const { QueryBuilder, Stripe } = require("../../../libs");
const {
  Order,
  OrderItem,
  Product,
  User,
  Address,
} = require("../../../database/mysql/models");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} orderId
 */
const validateOrderId = async (req, _res, next, orderId) => {
  const { userId } = req.auth;

  try {
    const order = await Order.model.findByPk(orderId);
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
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const { store } = req;
  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .whereLike("id", req.query.q)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const orders = await Order.model.findAndCountAll({
      where,
      include: [
        {
          model: OrderItem.model,
          as: "items",
          include: {
            model: Product.model,
            as: "product",
            attributes: [],
            where: {
              storeId: store.id,
            },
          },
        },
        {
          model: User.model,
          as: "customer",
        },
      ],
      order,
      limit,
      offset,
    });

    orders.rows.forEach((order) => {
      order.total = order.items.reduce(
        (acc, item) => acc + +item.price * +item.quantity,
        0
      );
    });

    orders.rows.forEach((order) => {
      delete order.items;
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
  const { orderId } = req.params;

  try {
    const order = await Order.model.findByPk(orderId, {
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
          model: User.model,
          as: "customer",
        },
        {
          model: Address.model,
          as: "address",
        },
      ],
    });
    order.total = order.items.reduce(
      (acc, item) => acc + +item.price * +item.quantity,
      0
    );

    const paymentIntent = await Stripe.paymentIntents.retrieve(
      order.paymentIntentId
    );
    const paymentMethod = await Stripe.paymentMethods.retrieve(
      paymentIntent.payment_method
    );

    res.json({
      ...order.toJSON(),
      paymentMethod,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateOrderId,
  findAll,
  findOne,
};
