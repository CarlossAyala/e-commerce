const express = require("express");
const Boom = require("@hapi/boom");
const { Order, OrderItem, Product } = require("../../../database/mysql/models");
const Stripe = require("../../stripe/stripe.connection");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./order.schema");
const router = express.Router();

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    // TODO: Add search by status
    const orders = await Order.model.findAll({
      where: {
        customerId,
      },
      order: [["orderedAt", "DESC"]],
    });

    for (const order of orders) {
      order.total /= 100;
    }

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// Get One
router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;

    try {
      const order = await Order.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!order || order.customerId !== customerId) {
        return next(Boom.notFound("Order not found"));
      }

      const orderItems = await OrderItem.model.findAll({
        where: {
          orderId: order.dataValues.id,
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

      return res.status(200).json({
        order: {
          ...order.dataValues,
          total: order.total / 100,
        },
        paymentIntent,
        paymentMethod,
        orderItems,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
