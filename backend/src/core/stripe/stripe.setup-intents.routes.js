const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const Stripe = require('./stripe.connection');
const { validateJWT } = require('../../middlewares/api');
const { User } = require('../../database/mysql/models');

router.get('/:id', validateJWT(), async (req, res, next) => {
  const { id } = req.params;

  try {
    const exist_customer = await User.model.findByPk(req.auth.id);
    if (!exist_customer) return next(Boom.notFound('Customer not found'));

    const { email } = exist_customer.dataValues;
    const { data: customer_data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (customer_data.length === 0) {
      return next(Boom.notFound('Customer not found'));
    }
    const [customer] = customer_data;

    const setupIntent = await Stripe.setupIntents.retrieve(id);
    if (setupIntent.customer !== customer.id) {
      return next(Boom.notFound('SetupIntent not found'));
    }

    return res.status(200).json(setupIntent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
