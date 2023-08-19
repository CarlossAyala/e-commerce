const express = require("express");
const router = express.Router();
const Stripe = require("./stripe.connection");
const Boom = require("@hapi/boom");
const JWT = require("../../middlewares/auth/jwt.auth");
const {
  User,
  CartProduct,
  Cart,
  Product,
  Address,
  Order,
  OrderItem,
  Review,
} = require("../../database/mysql/models");

// Create
router.post("/", JWT.verify, async (req, res, next) => {
  try {
    // Exist Customer in my Own Database
    const exist_customer = await User.model.findByPk(req.auth.id);
    if (!exist_customer) return next(Boom.notFound("Customer not found"));

    // Get Customer from Stripe
    const { email } = exist_customer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }
    const [customer] = data;

    // Get Cart Products
    const cart = await Cart.model.findOne({
      where: {
        customerId: req.auth.id,
      },
    });
    if (!cart) return next(Boom.notFound("Cart not found"));

    const cart_items = await CartProduct.model.findAll({
      where: {
        cartId: cart.dataValues.id,
        visible: true,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    if (cart_items.length === 0) {
      return next(Boom.badRequest("Cart must have at least one product"));
    }

    const itemsTotal = cart_items.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    const itemsTotalDecimals = itemsTotal * 100;

    // https://stripe.com/docs/currencies#importes-m%C3%ADnimo-y-m%C3%A1ximo-para-los-cobros
    const amount = itemsTotalDecimals + 50;

    const payment_intent = await Stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
    });

    console.log("payment_intent", payment_intent);

    return res.status(201).json({
      id: payment_intent.id,
      client_secret: payment_intent.client_secret,
    });
  } catch (error) {
    next(error);
  }
});

// Confirm
router.post("/confirm", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { address, paymentIntent, paymentMethod } = req.body;

  try {
    const existAddress = await Address.model.findOne({
      where: {
        id: address,
        customerId,
      },
    });
    if (!existAddress) return next(Boom.notFound("Address not found"));

    // Get Cart Products
    const cart = await Cart.model.findOne({
      where: {
        customerId,
      },
    });
    if (!cart) return next(Boom.notFound("Cart not found"));

    const cartItems = await CartProduct.model.findAll({
      where: {
        cartId: cart.dataValues.id,
        visible: true,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    if (cartItems.length === 0) {
      return next(Boom.badRequest("Cart must have at least one product"));
    }

    const itemsTotal = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    const itemsTotalDecimals = itemsTotal * 100;

    // https://stripe.com/docs/currencies#importes-m%C3%ADnimo-y-m%C3%A1ximo-para-los-cobros
    const amount = itemsTotalDecimals + 50;

    await Stripe.paymentIntents.update(paymentIntent, {
      amount,
      payment_method: paymentMethod,
    });
    const payment_intent = await Stripe.paymentIntents.confirm(paymentIntent);

    if (payment_intent.status === "succeeded") {
      const {
        name,
        phone,
        zipCode,
        province,
        city,
        street,
        apartmentNumber,
        indications,
      } = existAddress.dataValues;
      const order = await Order.model.create({
        total: amount,
        receiverName: name,
        receiverPhone: phone,
        zipCode,
        province,
        city,
        street,
        apartmentNumber,
        indications,
        customerId,
        status: Order.enums.pending,
        paymentIntentId: paymentIntent,
      });

      const orderItems = cartItems.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.product.id,
          orderId: order.id,
          price: item.product.price,
        };
      });
      const createdOrders = await OrderItem.model.bulkCreate(orderItems);

      const reviewItems = createdOrders.map((order) => {
        return {
          status: Review.enums.status.pending,
          orderItemId: order.id,
          customerId,
          productId: order.productId,
        };
      });
      await Review.model.bulkCreate(reviewItems, {
        validate: true,
      });

      // TODO: Aplicar STOCK y SOLD correspondiente a cada producto

      // Clear Cart
      await CartProduct.model.destroy({
        where: {
          cartId: cart.dataValues.id,
        },
      });

      return res.status(200).json({
        message: "Payment Succeeded",
        order: order.id,
      });
    }

    next(Boom.badRequest("Payment Failed"));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
