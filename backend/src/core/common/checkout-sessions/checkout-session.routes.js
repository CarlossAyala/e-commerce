const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { JWT } = require("../../../middlewares");
const { User } = require("../../../database/mysql/models");
const { Stripe } = require("../../../libs");

router.get("/:id", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { id: sessionId } = req.params;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;
    const { data: customer_data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = customer_data;

    const session = await Stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["setup_intent"],
    });
    if (customer.id !== session.customer) {
      return next(Boom.notFound("Checkout session not found"));
    }
    console.log("Checkout Session: ", session);

    return res.status(200).json({
      paymentMethod: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
});

// Create setup payment method
router.post("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { paymentIntentId, addressId } = req.query;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = data;

    const params = new URLSearchParams();
    params.append("session_id", "{CHECKOUT_SESSION_ID}");
    params.append("payment_intent_id", paymentIntentId);
    params.append("address_id", addressId);

    console.log("Params: ", params.toString());

    // TODO: Get Origin from .env
    const success_url = `${
      req.headers.origin
    }/checkout/payment?${params.toString()}`;
    const cancel_url = `${req.headers.origin}/checkout/cancel`;

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url,
      cancel_url,
    });

    return res.status(201).json(session.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
