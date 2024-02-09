const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { JWT } = require("../../../middlewares");
const {
  User,
  CartProduct,
  Product,
  Address,
  Order,
  OrderItem,
  Review,
} = require("../../../database/mysql/models");
const { Stripe } = require("../../../libs");

router.post("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  try {
    const existCustomer = await User.model.findOne({
      where: { id: customerId },
    });
    if (!existCustomer) throw Boom.notFound("Customer not found");

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = data;

    const cartItems = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    /*
     	TODO: Add follow validations:
			- Cart must have at least one product
			- Cart must have all products available
			- Cart must have all products enough stock
    */

    const cartItemsTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    const itemsTotalDecimals = cartItemsTotal * 100;

    const paymentIntent = await Stripe.paymentIntents.create({
      amount: itemsTotalDecimals,
      currency: "usd",
      customer: customer.id,
    });

    return res.status(201).json({
      id: paymentIntent.id,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/confirm", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { paymentIntentId, paymentMethodId, addressId } = req.body;

  try {
    const existCustomer = await User.model.findOne({
      where: { id: customerId },
    });
    if (!existCustomer) throw Boom.notFound("Customer not found");

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = data;

    const paymentIntent = await Stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
      throw Boom.notFound("PaymentIntent not found");
    } else if (paymentIntent.customer !== customer.id) {
      throw Boom.badRequest("PaymentIntent not found");
    } else if (paymentIntent.status !== "requires_payment_method") {
      throw Boom.badRequest(
        "PaymentIntent status must be 'requires_payment_method' to confirm it"
      );
    }

    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId
    );
    if (!paymentMethod) throw Boom.notFound("PaymentMethod not found");

    const address = await Address.model.findOne({
      where: {
        id: addressId,
        customerId,
      },
    });
    if (!address) throw Boom.notFound("Address not found");

    const cartItems = await CartProduct.model.findAll({
      where: {
        customerId,
      },
      include: {
        model: Product.model,
        as: "product",
      },
    });
    /*
     	TODO: Add follow validations:
			- Cart must have at least one product
			- Cart must have all products visible
			- Cart must have all products available
			- Cart must have all products enough stock
    */

    const cartItemsTotal = cartItems.reduce((acc, curr) => {
      return acc + curr.quantity * curr.product.price;
    }, 0);
    const itemsTotalDecimals = cartItemsTotal * 100;

    // Update amount and payment_method
    await Stripe.paymentIntents.update(paymentIntent, {
      amount: itemsTotalDecimals,
      payment_method: paymentMethod,
    });
    const intent = await Stripe.paymentIntents.confirm(paymentIntentId);

    // TODO
    // Generate a response based on the intent's status
    switch (intent.status) {
      case "requires_action":
      case "requires_source_action":
        // Card requires authentication
        // return {
        //   requiresAction: true,
        //   paymentIntentId: intent.id,
        //   clientSecret: intent.client_secret,
        // };
        throw Boom.badRequest("Card requires authentication");
      case "requires_payment_method":
      case "requires_source":
        // Card was not properly authenticated, suggest a new payment method
        // return {
        //   error: "Your card was denied, please provide a new payment method",
        // };
        throw Boom.badRequest(
          "Card was denied, please provide a new payment method"
        );
      case "succeeded": {
        // Payment is complete, authentication not required
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        const {
          name,
          phone,
          zipCode,
          province,
          city,
          street,
          apartmentNumber,
          indications,
        } = address.dataValues;

        const order = await Order.model.create({
          total: itemsTotalDecimals,
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
        const createOrderItems = await OrderItem.model.bulkCreate(orderItems);

        const reviewItems = createOrderItems.map((order) => {
          return {
            status: Review.enums.status.pending,
            orderItemId: order.id,
            customerId,
            productId: order.productId,
          };
        });
        await Review.model.bulkCreate(reviewItems);

        // TODO: Aplicar STOCK y SOLD correspondiente a cada producto

        await CartProduct.model.destroy({
          where: {
            customerId,
          },
        });

        return res.status(200).json({
          message: "Payment Succeeded",
          order: order.id,
        });
      }
      default:
        throw Boom.badRequest("Payment Failed");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
