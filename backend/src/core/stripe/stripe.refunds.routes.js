const express = require('express');
const Stripe = require('./strapi.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const refunds = await Stripe.refunds.list({
      limit: 3,
    });

    return res.status(200).json(refunds);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id = 're_3NHya8ARNTjegl3V1Ycrssda' } = req.params;

  try {
    const refund = await Stripe.refunds.retrieve(id);

    return res.status(200).json(refund);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const refund = await Stripe.refunds.create({
      charge: 'ch_3NHya8ARNTjegl3V1M3oGZLU',
    });

    return res.status(200).json(refund);
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  const { id = 're_3NHya8ARNTjegl3V1Ycrssda' } = req.params;

  try {
    const refund = await Stripe.refunds.update(id, {
      metadata: { order_id: '6735' },
    });

    return res.status(200).json(refund);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/cancel', async (req, res, next) => {
  const { id = 're_3NHya8ARNTjegl3V1Ycrssda' } = req.params;

  try {
    const refund = await Stripe.refunds.cancel(id);

    return res.status(200).json(refund);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
