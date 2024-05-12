const { Op } = require("sequelize");
const db = require("../../../db/mysql/models");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");
const Stripe = require("../../../services/stripe");

const OrderModel = db.sequelize.model("Order");
const OrderItemModel = db.sequelize.model("OrderItem");
const ProductModel = db.sequelize.model("Product");
const UserModel = db.sequelize.model("User");
const AddressModel = db.sequelize.model("Address");

const validateOrderId = async (req, _res, next, orderId) => {
  const { store } = req;

  try {
    const order = await OrderModel.findByPk(orderId, {
      raw: true,
    });
    if (!order) {
      throw new NotFound("Order not found");
    }

    const _items = await OrderItemModel.findAll({
      where: {
        orderId: order.id,
      },
      include: {
        model: ProductModel,
        as: "product",
      },
    });
    const items = _items.filter((item) => item.product.storeId === store.id);
    if (!items.length) {
      throw new NotFound("Order not found");
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

const findAll = async (req, res, next) => {
  const { store } = req;
  const { where, order, limit, offset } = new QueryBuilder(req.query)
    .whereLike("id", req.query.q)
    .orderBy("createdAt", "DESC")
    .pagination()
    .build();

  try {
    const orders = await OrderModel.findAndCountAll({
      where,
      include: [
        {
          model: OrderItemModel,
          as: "items",
          include: {
            model: ProductModel,
            as: "product",
            attributes: [],
            where: {
              storeId: store.id,
            },
          },
        },
        {
          model: UserModel,
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

const findOne = async (req, res, next) => {
  const { order, items } = req;

  try {
    const address = await AddressModel.findByPk(order.addressId, {
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

const findLatest = async (req, res, next) => {
  const { store } = req;

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  try {
    const orders = await OrderModel.findAndCountAll({
      where: {
        createdAt: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
      include: [
        {
          model: OrderItemModel,
          as: "items",
          include: {
            model: ProductModel,
            as: "product",
            attributes: [],
            where: {
              storeId: store.id,
            },
          },
        },
        {
          model: UserModel,
          as: "customer",
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateOrderId,
  findAll,
  findOne,
  findLatest,
};