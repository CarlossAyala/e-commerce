const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const {
  Product,
  Store,
  Order,
  OrderItem,
  User,
} = require("../../../database/mysql/models");
const { validateSchema, JWT } = require("../../../middlewares");
const QueryBuilder = require("../../../utils/database/query-builder");
const schema = require("./sale.schema");

// Get All
router.get("/", JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  const { order, limit, offset } = new QueryBuilder(req.query)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound("Store not found"));

    const orders = await OrderItem.model.findAndCountAll({
      include: {
        model: Product.model,
        as: "product",
        where: {
          storeId: store.id,
        },
      },
      distinct: true,
      order,
      limit,
      offset,
    });

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

// Get
router.get(
  "/:id",
  JWT.verify,
  validateSchema(schema.resourceId, "params"),
  async (req, res, next) => {
    const { id: orderId } = req.params;
    const { id: sellerId } = req.auth;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.notFound("Store not found"));

      const order = await Order.model.findOne({
        where: {
          id: orderId,
        },
        include: [
          {
            model: User.model,
            as: "customer",
            attributes: {
              exclude: ["id", "password", "createdAt", "updatedAt"],
            },
          },
          {
            model: OrderItem.model,
            as: "items",
            include: {
              model: Product.model,
              as: "product",
              where: {
                storeId: store.id,
              },
            },
          },
        ],
      });
      if (!order) return next(Boom.notFound("Order not found"));
      else if (order.items.length === 0) {
        return next(Boom.notFound("Order not found"));
      }

      order.total /= 100;

      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
