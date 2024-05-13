// eslint-disable-next-line no-unused-vars
import express from "express";
import {
  Order,
  OrderItem,
  Product,
  Address,
  ProductImage,
} from "../../../database/mysql/models/index.js";
import { notFound } from "../../../middlewares/index.js";
import { QueryBuilder, Stripe } from "../../../libs/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} orderId
 */
export const validateOrderId = async (req, _res, next, orderId) => {
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
export const validateItemId = async (req, _res, next, itemId) => {
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
          include: {
            model: ProductImage.model,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
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
export const findAll = async (req, res, next) => {
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
            include: {
              model: ProductImage.model,
              as: "gallery",
              order: [["order", "ASC"]],
              separate: true,
              required: false,
            },
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
export const findOne = async (req, res, next) => {
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
        include: {
          model: ProductImage.model,
          as: "gallery",
          order: [["order", "ASC"]],
          separate: true,
          required: false,
        },
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
export const findItem = async (req, res, next) => {
  const { item } = req;

  try {
    res.json(item);
  } catch (error) {
    next(error);
  }
};
