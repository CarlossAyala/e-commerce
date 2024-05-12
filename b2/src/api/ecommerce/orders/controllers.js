const db = require("../../../db/mysql/models");
const Stripe = require("../../../services/stripe");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");

const OrderModel = db.sequelize.model("Order");
const OrderItemModel = db.sequelize.model("OrderItem");
const ProductModel = db.sequelize.model("Product");
const AddressModel = db.sequelize.model("Address");
const ProductImageModel = db.sequelize.model("ProductImage");

const validateOrderId = async (req, _res, next, orderId) => {
  const { userId } = req.auth;

  try {
    const order = await OrderModel.findByPk(orderId, {
      raw: true,
    });
    if (!order || order.customerId !== userId) {
      throw new NotFound("Order not found");
    }

    req.order = order;
    next();
  } catch (error) {
    next(error);
  }
};

const validateItemId = async (req, _res, next, itemId) => {
  const { userId } = req.auth;

  try {
    const item = await OrderItemModel.findByPk(itemId, {
      include: [
        {
          model: OrderModel,
          as: "order",
          where: {
            customerId: userId,
          },
        },
        {
          model: ProductModel,
          as: "product",
          include: {
            model: ProductImageModel,
            as: "gallery",
            separate: true,
            order: [["order", "ASC"]],
            required: false,
          },
        },
      ],
    });
    if (!item) {
      throw new NotFound("Order Item not found");
    }

    req.item = item;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { userId } = req.auth;
  const qb = new QueryBuilder(req.query)
    .where("customerId", userId)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const orders = await OrderModel.findAndCountAll({
      ...qb,
      include: [
        {
          model: OrderItemModel,
          as: "items",
          include: {
            model: ProductModel,
            as: "product",
            include: {
              model: ProductImageModel,
              as: "gallery",
              order: [["order", "ASC"]],
              separate: true,
              required: false,
            },
          },
        },
        {
          model: AddressModel,
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

const findOne = async (req, res, next) => {
  const { order } = req;

  try {
    const address = await AddressModel.findByPk(order.addressId, {
      raw: true,
    });

    const items = await OrderItemModel.findAll({
      where: {
        orderId: order.id,
      },
      include: {
        model: ProductModel,
        as: "product",
        include: {
          model: ProductImageModel,
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

const findItem = async (req, res, next) => {
  const { item } = req;

  try {
    res.json(item);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  findItem,
  validateOrderId,
  validateItemId,
};
