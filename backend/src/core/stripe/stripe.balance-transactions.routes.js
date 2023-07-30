const express = require('express');
const Stripe = require('./stripe.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const balanceTransactions = await Stripe.balanceTransactions.list({
      limit: 3,
    });

    return res.status(200).json(balanceTransactions);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id = 'txn_3NHya8ARNTjegl3V1ixp180D' } = req.params;

  try {
    const balanceTransaction = await Stripe.balanceTransactions.retrieve(id);

    return res.status(200).json(balanceTransaction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
