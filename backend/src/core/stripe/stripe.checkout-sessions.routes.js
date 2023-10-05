const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const Stripe = require("./stripe.connection");
const { User } = require("../../database/mysql/models");
const { JWT } = require("../../middlewares");

router.get("/:id", JWT.verify, async (req, res, next) => {
  const { id } = req.params;

  try {
    const exist_customer = await User.model.findByPk(req.auth.id);
    if (!exist_customer) return next(Boom.notFound("Customer not found"));

    const { email } = exist_customer.dataValues;
    const { data: customer_data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (customer_data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }
    const [customer] = customer_data;

    const session = await Stripe.checkout.sessions.retrieve(id, {
      expand: ["setup_intent"],
    });
    console.log("session", session);

    if (customer.id !== session.customer) {
      return next(Boom.notFound("Customer not found"));
    }

    return res.status(200).json({
      payment_method: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
});

// Create
router.post("/", JWT.verify, async (req, res, next) => {
  try {
    // Exist Customer in my Own Database
    const exist_customer = await User.model.findByPk(req.auth.id);
    if (!exist_customer) return next(Boom.notFound("Customer not found"));

    const { email } = exist_customer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }
    const [customer] = data;

    let params = `session_id={CHECKOUT_SESSION_ID}&payment_intent_id=${req.query.payment_intent_id}`;
    if (req.query.address_id) params += `&address_id=${req.query.address_id}`;

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url: `${req.headers.origin}/checkout/payment?${params}`,
      cancel_url: `${req.headers.origin}/checkout/cancel`,
    });

    return res.status(201).json(session.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
