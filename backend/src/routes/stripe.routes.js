const express = require('express');
const stripe = express.Router();

const balance = require('../core/stripe/stripe.balance.routes');
const balanceTransactions = require('../core/stripe/stripe.balance-transactions.routes');
const charges = require('../core/stripe/stripe.charges.routes');
const customers = require('../core/stripe/stripe.customers.routes');
const paymentIntents = require('../core/stripe/stripe.payment-intents.routes');
const setupIntents = require('../core/stripe/stripe.setup-intents.routes');
const setupAttempts = require('../core/stripe/stripe.setup-attempts.routes');
const payouts = require('../core/stripe/stripe.payouts.routes');
const refunds = require('../core/stripe/stripe.refunds.routes');
const cards = require('../core/stripe/stripe.cards.routes');
const shippingRates = require('../core/stripe/stripe.shipping-rates.routes');
const checkoutSessions = require('../core/stripe/stripe.checkout-sessions.routes');

stripe.use('/balance', balance);
stripe.use('/balance-transactions', balanceTransactions);
stripe.use('/charges', charges);
stripe.use('/customers', customers);
stripe.use('/payment-intents', paymentIntents);
stripe.use('/setup-intents', setupIntents);
stripe.use('/setup-attempts', setupAttempts);
stripe.use('/payouts', payouts);
stripe.use('/refunds', refunds);
stripe.use('/cards', cards);
stripe.use('/shipping-rates', shippingRates);
stripe.use('/checkout-sessions', checkoutSessions);

module.exports = stripe;
