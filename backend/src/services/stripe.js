const stripe = require("stripe");
const env = require("../config");

const Stripe = stripe(env.stripe.sk_test, {
  apiVersion: "2023-08-16",
});

module.exports = Stripe;
