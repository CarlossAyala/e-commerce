// eslint-disable-next-line no-unused-vars
const express = require("express");
const { notFound } = require("../middlewares");
const { Stripe } = require("../libs");

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const checkStripeAccount = async (req, _res, next) => {
  const { user } = req;
  const { email } = user;

  try {
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });
    const [customer] = data;
    if (!customer) throw notFound("Stripe Account not found");

    req.stripe = { customer };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkStripeAccount;
