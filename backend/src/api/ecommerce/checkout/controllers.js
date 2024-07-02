const sequelize = require("../../../db/mysql");
const Stripe = require("../../../services/stripe");
const { NotFound, BadRequest } = require("../../../utils/http-errors");
const OrderPlacedJob = require("../../../jobs/order-placed");

const CartModel = sequelize.model("Cart");
const ProductModel = sequelize.model("Product");
const AddressModel = sequelize.model("Address");
const OrderModel = sequelize.model("Order");
const OrderItemModel = sequelize.model("OrderItem");

const validatePaymentIntentId = async (req, _res, next, paymentIntentId) => {
  const { customer } = req.stripe;

  try {
    const paymentIntent = await Stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.customer !== customer.id) {
      throw new NotFound("Payment Intent not found");
    }

    req.paymentIntent = paymentIntent;
    next();
  } catch (error) {
    next(error);
  }
};

const findPaymentIntent = async (req, res, next) => {
  const { paymentIntent } = req;

  // https://stripe.com/docs/payments/paymentintents/lifecycle
  const STATUS_REQUIRED = [
    "requires_payment_method",
    "requires_confirmation",
    "requires_action",
  ];

  try {
    if (!STATUS_REQUIRED.includes(paymentIntent.status)) {
      throw new BadRequest("Payment Intent status is not valid");
    }

    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
};

const createPaymentIntent = async (req, res, next) => {
  const { userId } = req.auth;
  const { customer } = req.stripe;

  try {
    const cart = await CartModel.findAll({
      where: {
        userId,
      },
      include: {
        model: ProductModel,
        as: "product",
      },
    });

    if (!cart.length) {
      throw new NotFound("Cart is empty");
    } else if (cart.some((item) => !item.product.available)) {
      throw new BadRequest("Some products are not available");
    } else if (cart.some((item) => item.quantity > item.product.stock)) {
      throw new BadRequest("Some products are out of stock");
    }

    const amount = cart.reduce(
      (acc, item) => acc + item.quantity * +item.product.price,
      0,
    );

    const paymentIntent = await Stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
    });

    res.json(paymentIntent);
  } catch (error) {
    next(error);
  }
};

const confirmPaymentIntent = async (req, res, next) => {
  const { userId } = req.auth;
  const { customer } = req.stripe;
  const { paymentIntent } = req;
  const { paymentMethodId, addressId } = req.body;

  try {
    if (paymentIntent.status !== "requires_payment_method") {
      throw new BadRequest("Payment Intent status is not valid");
    }

    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId,
    );
    if (!paymentMethod) {
      throw new NotFound("PaymentMethod not found");
    }

    const address = await AddressModel.findByPk(addressId);
    if (!address || address.userId !== userId) {
      throw new NotFound("Address not found");
    }

    const cart = await CartModel.findAll({
      where: {
        userId,
      },
      include: {
        model: ProductModel,
        as: "product",
      },
    });
    if (!cart.length) {
      throw new NotFound("Cart is empty");
    } else if (cart.some((item) => !item.product.available)) {
      throw new BadRequest("Some products are not available");
    } else if (cart.some((item) => item.quantity > item.product.stock)) {
      throw new BadRequest("Some products are out of stock");
    }

    const amount = cart.reduce(
      (acc, item) => acc + item.quantity * +item.product.price,
      0,
    );

    await Stripe.paymentIntents.update(paymentIntent.id, {
      amount: amount * 100,
      payment_method: paymentMethodId,
    });
    const result = await Stripe.paymentIntents.confirm(paymentIntent.id);

    switch (result.status) {
      case "requires_payment_method": {
        throw new BadRequest("Payment method declined. Try another.");
      }
      case "succeeded": {
        const result = await sequelize.transaction(async (t) => {
          const order = await OrderModel.create(
            {
              total: amount,
              userId,
              addressId,
              paymentIntentId: paymentIntent.id,
            },
            {
              transaction: t,
            },
          );

          const items = cart.map((item) => ({
            quantity: item.quantity,
            price: item.product.price,
            productId: item.product.id,
            orderId: order.id,
          }));
          await OrderItemModel.bulkCreate(items, {
            transaction: t,
          });

          // Apply changes to sold and stock products
          await Promise.all([
            ...cart.map((item) => {
              return ProductModel.increment(
                { sold: item.quantity },
                {
                  where: { id: item.productId },
                  transaction: t,
                },
              );
            }),
            ...cart.map((item) => {
              return ProductModel.decrement(
                { stock: item.quantity },
                {
                  where: { id: item.productId },
                  transaction: t,
                },
              );
            }),
          ]);

          await CartModel.destroy({
            where: {
              userId,
            },
            transaction: t,
          });

          return order;
        });

        await OrderPlacedJob.queue.sendEmail({ orderId: result.id });

        res.json(result);
        break;
      }
      default: {
        throw new BadRequest("Payment Failed");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validatePaymentIntentId,
  findPaymentIntent,
  createPaymentIntent,
  confirmPaymentIntent,
};
