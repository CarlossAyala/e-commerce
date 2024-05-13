// eslint-disable-next-line no-unused-vars
import express from "express";
import { Stripe } from "../../../libs/index.js";
import { badRequest, notFound } from "../../../middlewares/index.js";
import {
  CartProduct,
  Product,
  Address,
  Order,
  OrderItem,
} from "../../../database/mysql/models/index.js";
import { sequelize } from "../../../database/mysql/index.js";
import { sendOrderPlacedEmail } from "../../../jobs/order-placed/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} paymentIntentId
 */
export const validatePaymentIntentId = async (
  req,
  _res,
  next,
  paymentIntentId
) => {
  const { customer } = req.stripe;

  try {
    const paymentIntent = await Stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.customer !== customer.id) {
      throw notFound("Payment Intent not found");
    }

    req.paymentIntent = paymentIntent;
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
export const findPaymentIntent = async (req, res, next) => {
  const { paymentIntent } = req;

  // https://stripe.com/docs/payments/paymentintents/lifecycle
  const STATUS_REQUIRED = [
    "requires_payment_method",
    "requires_confirmation",
    "requires_action",
  ];

  try {
    if (!STATUS_REQUIRED.includes(paymentIntent.status)) {
      throw badRequest("Payment Intent status is not valid");
    }

    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const createPaymentIntent = async (req, res, next) => {
  const { userId: customerId } = req.auth;
  const { customer } = req.stripe;

  try {
    const cart = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });

    if (!cart.length) {
      throw notFound("Cart is empty");
    } else if (cart.some((item) => !item.product.available)) {
      throw badRequest("Some products are not available");
    } else if (cart.some((item) => item.quantity > item.product.stock)) {
      throw badRequest("Some products are out of stock");
    }

    const amount = cart.reduce(
      (acc, item) => acc + item.quantity * +item.product.price,
      0
    );

    const paymentIntent = await Stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      customer: customer.id,
    });

    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const confirmPaymentIntent = async (req, res, next) => {
  const { userId: customerId } = req.auth;
  const { customer } = req.stripe;
  const { paymentIntent } = req;
  const { paymentMethodId, addressId } = req.body;

  try {
    if (paymentIntent.status !== "requires_payment_method") {
      throw badRequest("Payment Intent status is not valid");
    }

    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId
    );
    if (!paymentMethod) {
      throw notFound("PaymentMethod not found");
    }

    const address = await Address.model.findByPk(addressId);
    if (!address || address.customerId !== customerId) {
      throw notFound("Address not found");
    }

    const cart = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    if (!cart.length) {
      throw notFound("Cart is empty");
    } else if (cart.some((item) => !item.product.available)) {
      throw badRequest("Some products are not available");
    } else if (cart.some((item) => item.quantity > item.product.stock)) {
      throw badRequest("Some products are out of stock");
    }

    const amount = cart.reduce(
      (acc, item) => acc + item.quantity * +item.product.price,
      0
    );

    await Stripe.paymentIntents.update(paymentIntent.id, {
      amount: amount * 100,
      payment_method: paymentMethodId,
    });
    const result = await Stripe.paymentIntents.confirm(paymentIntent.id);

    switch (result.status) {
      case "requires_payment_method": {
        throw badRequest("Payment method declined. Try another.");
      }
      case "succeeded": {
        const result = await sequelize.transaction(async (t) => {
          const order = await Order.model.create(
            {
              total: amount,
              customerId,
              addressId,
              paymentIntentId: paymentIntent.id,
            },
            {
              transaction: t,
            }
          );

          const items = cart.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
            productId: item.product.id,
            orderId: order.id,
          }));
          await OrderItem.model.bulkCreate(items, {
            transaction: t,
          });

          // Apply changes to sold and stock products
          await Promise.all([
            ...cart.map((item) => {
              return Product.model.increment(
                { sold: item.quantity },
                {
                  where: { id: item.productId },
                  transaction: t,
                }
              );
            }),
            ...cart.map((item) => {
              return Product.model.decrement(
                { stock: item.quantity },
                {
                  where: { id: item.productId },
                  transaction: t,
                }
              );
            }),
          ]);

          await CartProduct.model.destroy({
            where: {
              customerId,
            },
            transaction: t,
          });

          return order;
        });

        await sendOrderPlacedEmail({ hi: "world" });

        res.json(result);
        break;
      }
      default: {
        throw badRequest("Payment Failed");
      }
    }
  } catch (error) {
    next(error);
  }
};
