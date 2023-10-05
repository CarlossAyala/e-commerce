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
