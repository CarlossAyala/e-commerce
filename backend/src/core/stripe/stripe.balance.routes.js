const express = require('express');
const Stripe = require('./stripe.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const balance = await Stripe.balance.retrieve();

    return res.status(200).json(balance);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
