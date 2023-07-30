const express = require('express');
const Stripe = require('./stripe.connection');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const setupAttempts = await Stripe.setupAttempts.list({
      setup_intent: 'seti_1NIASI2eZvKYlo2CIbsVsX7W',
    });

    return res.status(200).json(setupAttempts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
