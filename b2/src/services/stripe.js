const stripe = require("stripe");
const env = require("../config");

const Stripe = stripe(env.stripe.sk_test);

module.exports = Stripe;
