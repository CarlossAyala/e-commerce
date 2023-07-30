const config = require('../../config');
const Stripe = require('stripe')(config.stipe.sk_test);

module.exports = Stripe;
