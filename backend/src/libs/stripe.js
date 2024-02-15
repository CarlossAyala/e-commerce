const { stipe } = require("../config/environments");
const Stripe = require("stripe")(stipe.sk_test);

module.exports = Stripe;
