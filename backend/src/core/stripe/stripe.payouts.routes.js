const express = require('express');
const Stripe = require('./stripe.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const payouts = await Stripe.payouts.list({
      limit: 3,
    });

    return res.status(200).json(payouts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id = 'po_1NIAbyARNTjegl3VNN8kZfCJ' } = req.params;

  try {
    const payout = await Stripe.payouts.retrieve(id);

    return res.status(200).json(payout);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payout = await Stripe.payouts.create({
      amount: 1100,
      currency: 'usd',
    });

    return res.status(200).json(payout);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id = 'po_1NIAbyARNTjegl3VNN8kZfCJ' } = req.params;

  try {
    const payout = await Stripe.payouts.update(id, {
      metadata: { order_id: '6735' },
    });

    return res.status(200).json(payout);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/cancel', async (req, res, next) => {
  const { id = 'po_1NIAbyARNTjegl3VNN8kZfCJ' } = req.params;

  try {
    const payout = await Stripe.payouts.cancel(id);

    return res.status(200).json(payout);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
