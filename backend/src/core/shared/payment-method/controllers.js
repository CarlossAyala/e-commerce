// eslint-disable-next-line no-unused-vars
const express = require("express");
const { Stripe } = require("../../../libs");
const { notFound } = require("../../../middlewares");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 * @param {string} paymentMethodId
 */
const validatePaymentMethodId = async (req, _res, next, paymentMethodId) => {
  const { customer } = req.stripe;

  try {
    const paymentMethod = await Stripe.customers.retrievePaymentMethod(
      customer.id,
      paymentMethodId
    );
    if (!paymentMethod) {
      throw notFound("Payment method not found");
    }

    req.paymentMethod = paymentMethod;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * TODO: Add pagination
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findAll = async (req, res, next) => {
  const { customer } = req.stripe;

  try {
    const { data: paymentMethods } = await Stripe.customers.listPaymentMethods(
      customer.id,
      {
        type: "card",
      }
    );

    res.json(paymentMethods);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findOne = async (req, res, next) => {
  const { paymentMethod } = req;

  try {
    res.json(paymentMethod);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const findSession = async (req, res, next) => {
  const { customer } = req.stripe;
  const { sessionId } = req.params;

  try {
    const session = await Stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["setup_intent"],
    });
    if (!session || customer.id !== session.customer) {
      throw notFound("Checkout session not found");
    }

    res.json({
      id: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
  const { customer } = req.stripe;
  // TODO: Validate those
  const { paymentIntentId, addressId } = req.body;

  try {
    // TODO: Get Origin from .env
    const success_url = `${req.headers.origin}/customer/checkout/${paymentIntentId}/payment-method?session_id={CHECKOUT_SESSION_ID}&address_id=${addressId}`;

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "setup",
      customer: customer.id,
      success_url,
      cancel_url: `${req.headers.origin}/customer/cart`,
    });

    res.json(session.url);
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const remove = async (req, res, next) => {
  const { paymentMethodId } = req.params;

  try {
    await Stripe.paymentMethods.detach(paymentMethodId);

    res.json({ message: "Payment method deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validatePaymentMethodId,
  findAll,
  findOne,
  findSession,
  create,
  remove,
};
