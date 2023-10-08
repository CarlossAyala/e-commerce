const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { JWT } = require("../../../middlewares");
const { Stripe } = require("../../../libs");
const { User } = require("../../../database/mysql/models");

router.get("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) throw Boom.notFound("Customer not found");

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    const [customer] = data;

    // TODO: Add pagination
    const { data: paymentMethods } = await Stripe.customers.listPaymentMethods(
      customer.id,
      { type: "card" }
    );

    return res.status(200).json(paymentMethods);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { id: paymentMethodId } = req.params;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) throw Boom.notFound("Customer not found");

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    const [customer] = data;
    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId
    );
    if (!paymentMethod) throw Boom.notFound("Payment method not found");

    return res.status(200).json(paymentMethod);
  } catch (error) {
    next(error);
  }
});

router.get("/session/:id", JWT.verify, async (req, res, next) => {
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
      id: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { paymentIntentId, addressId } = req.body;

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
    params.append("payment_intent_id", paymentIntentId);
    params.append("address_id", addressId);

    console.log("Params: ", params.toString());

    // TODO: Get Origin from .env
    const success_url = `${
      req.headers.origin
    }/customer/checkout?session_id={CHECKOUT_SESSION_ID}&${params.toString()}`;

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url,
      cancel_url: success_url,
    });

    return res.status(201).json(session.url);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", JWT.verify, async (req, res, next) => {
  const { id: customerId } = req.auth;
  const { id: paymentMethodId } = req.params;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) throw Boom.notFound("Customer not found");

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    const [customer] = data;

    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId
    );
    if (!paymentMethod) throw Boom.notFound("Payment method not found");

    await Stripe.paymentMethods.detach(paymentMethodId);

    return res.status(200).json({ message: "Payment method deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
