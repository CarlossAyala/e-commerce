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
  const { store } = req;

  try {
    const order = await Order.model.findByPk(orderId, {
      raw: true,
    });
    if (!order) {
      throw notFound("Order not found");
    }

    const _items = await OrderItem.model.findAll({
      where: {
        orderId: order.id,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    const items = _items.filter((item) => item.product.storeId === store.id);
    if (!items.length) {
      throw notFound("Order not found");
    }

    order.total = items.reduce(
      (acum, item) => acum + item.quantity * +item.price,
      0
    );

    req.order = order;
    req.items = items;
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

    for (const order of orders.rows) {
      order.total = order.items.reduce(
        (acum, item) => acum + item.quantity * +item.price,
        0
      );
    }

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
  const { order, items } = req;

  try {
    const address = await Address.model.findByPk(order.addressId, {
      raw: true,
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

module.exports = {
  validateOrderId,
  findAll,
  findOne,
};
