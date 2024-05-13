// eslint-disable-next-line no-unused-vars
import express from "express";
import { notFound } from "../middlewares/http-errors.js";
import { Stripe } from "../libs/index.js";

/**
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
export const checkStripeAccount = async (req, _res, next) => {
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
