const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const Stripe = require("../../stripe/stripe.connection");
const { User } = require("../../../database/mysql/models");
const { JWT } = require("../../../middlewares");

router.get("/", JWT.verify, async (req, res, next) => {
  const customerId = req.auth.id;
  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }

    const [customer] = data;
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
  const customerId = req.auth.id;
  const paymentMethodId = req.params.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }

    const [customer] = data;
    const paymentMethod = await Stripe.paymentMethods.retrieve(paymentMethodId);

    if (paymentMethod.customer !== customer.id) {
      return next(Boom.notFound("Payment method not found"));
    }

    return res.status(200).json(paymentMethod);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", JWT.verify, async (req, res, next) => {
  const customerId = req.auth.id;
  const paymentMethodId = req.params.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }

    const [customer] = data;
    const paymentMethod = await Stripe.paymentMethods.retrieve(paymentMethodId);

    if (paymentMethod.customer !== customer.id) {
      return next(Boom.notFound("Payment method not found"));
    }

    await Stripe.paymentMethods.detach(paymentMethodId);

    return res.status(200).json({ message: "Payment method deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
