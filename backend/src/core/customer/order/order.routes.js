const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const {
  Order,
  OrderItem,
  Product,
  User,
} = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const schemas = require("./order.schema");
const { QueryBuilder, Stripe } = require("../../../libs");

router.get("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  const { where, limit, offset, order } = new QueryBuilder(req.query)
    .where("customerId", customerId)
    .orderBy("orderedAt", "DESC")
    .pagination()
    .build();

  try {
    const customer = await User.model.findByPk(customerId);
    if (!customer) {
      throw Boom.notFound("Customer not found");
    }

    const orders = await Order.model.findAndCountAll({
      where,
      include: {
        model: OrderItem.model,
        as: "items",
      },
      distinct: true,
      order,
      offset,
      limit,
    });

    return res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: customerId } = req.auth;
    const { id: orderId } = req.params;

    try {
      const customer = await User.model.findByPk(customerId);
      if (!customer) {
        throw Boom.notFound("Customer not found");
      }

      const order = await Order.model.findByPk(orderId);
      if (!order || order.customerId !== customerId) {
        throw Boom.notFound("Order not found");
      }

      const items = await OrderItem.model.findAll({
        where: {
          orderId,
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

      return res.json({
        order,
        items,
        paymentIntent,
        paymentMethod,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
