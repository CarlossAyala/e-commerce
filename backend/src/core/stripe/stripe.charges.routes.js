const express = require('express');
const Stripe = require('./stripe.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const charges = await Stripe.charges.list({
      limit: 3,
    });

    return res.status(200).json(charges);
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const charge = await Stripe.charges.search({
      query: "amount>999 AND metadata['order_id']:'6735'",
    });

    return res.status(200).json(charge);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id = 'ch_3NHya8ARNTjegl3V1M3oGZLU' } = req.params;
  try {
    const charge = await Stripe.charges.retrieve(id);

    return res.status(200).json(charge);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
    const charge = await Stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      source: 'tok_amex',
      description:
        'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
    });

    return res.status(201).json(charge);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id = 'ch_3NHya8ARNTjegl3V1M3oGZLU' } = req.params;
  try {
    const charge = await Stripe.charges.update(id, {
      metadata: { order_id: '6735' },
    });

    return res.status(200).json(charge);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/capture', async (req, res, next) => {
  const { id = 'ch_3NHya8ARNTjegl3V1M3oGZLU' } = req.params;
  try {
    const charge = await Stripe.charges.capture(id);

    return res.status(200).json(charge);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
