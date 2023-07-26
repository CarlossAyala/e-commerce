const express = require('express');
const strapiCore = express.Router();

const balance = require('../core/stripe/stripe.balance.routes');
const balanceTransactions = require('../core/stripe/stripe.balance-transactions.routes');
const charges = require('../core/stripe/stripe.charges.routes');
const customers = require('../core/stripe/stripe.customers.routes');
const paymentIntents = require('../core/stripe/stripe.payment-intents.routes');
const setupIntents = require('../core/stripe/stripe.setup-intents.routes');
const setupAttempts = require('../core/stripe/stripe.setup-attempts.routes');
const payouts = require('../core/stripe/stripe.payouts.routes');
const refunds = require('../core/stripe/stripe.refunds.routes');
const paymentMethods = require('../core/stripe/stripe.payment-methods.routes');
const cards = require('../core/stripe/stripe.cards.routes');
const shippingRates = require('../core/stripe/stripe.shipping-rates.routes');
const checkoutSessions = require('../core/stripe/stripe.checkout-sessions.routes');

strapiCore.use('/balance', balance);
strapiCore.use('/balance-transactions', balanceTransactions);
strapiCore.use('/charges', charges);
strapiCore.use('/customers', customers);
strapiCore.use('/payment-intents', paymentIntents);
strapiCore.use('/payment-methods', paymentMethods);
strapiCore.use('/setup-intents', setupIntents);
strapiCore.use('/setup-attempts', setupAttempts);
strapiCore.use('/payouts', payouts);
strapiCore.use('/refunds', refunds);
strapiCore.use('/cards', cards);
strapiCore.use('/shipping-rates', shippingRates);
strapiCore.use('/checkout-sessions', checkoutSessions);

module.exports = strapiCore;
