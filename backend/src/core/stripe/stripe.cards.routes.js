const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const Stripe = require('./stripe.connection');
const { validateJWT } = require('../../middlewares/api');
const { User } = require('../../database/mysql/models');
// const validatorSchema = require('../../middlewares/api/validator.middleware');
// const schemas = require('./card.schema');

router.get('/', validateJWT(), async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound('Customer not found'));

    const { email } = existCustomer.dataValues;

    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound('Customer not found'));
    }

    const [customer] = data;

    // TODO: Pagination?
    const { data: cards } = await Stripe.customers.listSources(customer.id, {
      object: 'card',
      limit: 10,
    });

    return res.status(200).json(cards);
  } catch (error) {
    next(error);
  }
});

router.get('/:cardId', validateJWT(), async (req, res, next) => {
  const customerId = req.auth.id;
  const { cardId } = req.params;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound('Customer not found'));

    const { email } = existCustomer.dataValues;

    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound('Customer not found'));
    }
    const [customer] = data;

    const card = await Stripe.customers.retrieveSource(customer.id, cardId);

    return res.status(200).json(card);
  } catch (error) {
    next(error);
  }
});

router.post('/', validateJWT(), async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound('Customer not found'));

    const { email } = existCustomer.dataValues;

    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound('Customer not found'));
    }

    const [customer] = data;

    const card = await Stripe.customers.createSource(customer.id, {
      source: 'tok_mastercard',
    });

    return res.status(201).json(card);
  } catch (error) {
    next(error);
  }
});

// router.patch('/:card_id', async (req, res, next) => {
//   const customer = 'cus_O4Jq2eP0A1rHQA';
//   const { card_id = 'card_1NIBCaARNTjegl3VPbESQqLs' } = req.params;

//   try {
//     const card = await Stripe.customers.updateSource(customer, card_id, {
//       name: 'Jenny Rosen',
//     });

//     return res.status(200).json(card);
//   } catch (error) {
//     next(error);
//   }
// });

router.delete('/:card_id', async (req, res, next) => {
  const customer = 'cus_O4Jq2eP0A1rHQA';
  const { card_id = 'card_1NIBCaARNTjegl3VPbESQqLs' } = req.params;

  try {
    const deleted = await Stripe.customers.deleteSource(customer, card_id);

    return res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
