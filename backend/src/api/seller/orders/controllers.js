const { Op } = require("sequelize");
const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");
const QueryBuilder = require("../../../utils/query-builder");
const Stripe = require("../../../services/stripe");

const OrderModel = sequelize.model("Order");
const OrderItemModel = sequelize.model("OrderItem");
const ProductModel = sequelize.model("Product");
const ProductGalleryModel = sequelize.model("ProductGallery");
const UserModel = sequelize.model("User");
const AddressModel = sequelize.model("Address");

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
        include: {
          model: ProductGalleryModel,
          as: "gallery",
          order: [["order", "ASC"]],
          separate: true,
          required: false,
        },
      },
    });
    const items = _items.filter((item) => item.product.storeId === store.id);
    if (!items.length) {
      throw new NotFound("Order not found");
    }

    order.total = items.reduce(
      (acum, item) => acum + item.quantity * +item.price,
      0,
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
          as: "user",
        },
      ],
      order,
      limit,
      offset,
    });

    for (const order of orders.rows) {
      order.total = order.items.reduce(
        (acum, item) => acum + item.quantity * +item.price,
        0,
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

    const paymentIntent = order.paymentIntentId
      ? await Stripe.paymentIntents.retrieve(order.paymentIntentId)
      : null;

    const paymentMethod = paymentIntent
      ? await Stripe.paymentMethods.retrieve(paymentIntent.payment_method)
      : {
          card: {
            brand: "Visa (Test)",
            last4: "4242",
            exp_month: "12",
            exp_year: new Date().getFullYear() + 1,
          },
        };

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
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
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
          as: "user",
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
