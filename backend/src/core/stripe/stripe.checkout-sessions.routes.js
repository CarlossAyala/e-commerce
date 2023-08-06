const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const Stripe = require('./stripe.connection');
const { User } = require('../../database/mysql/models');
const JWT = require('../../middlewares/auth/jwt.auth');

router.get('/:id', JWT.verify, async (req, res, next) => {
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

    const session = await Stripe.checkout.sessions.retrieve(id, {
      expand: ['setup_intent'],
    });
    console.log('session', session);

    if (customer.id !== session.customer) {
      return next(Boom.notFound('Customer not found'));
    }

    return res.status(200).json({
      payment_method: session.setup_intent.payment_method,
    });
  } catch (error) {
    next(error);
  }
});

// Create
router.post('/', JWT.verify, async (req, res, next) => {
  try {
    // Exist Customer in my Own Database
    const exist_customer = await User.model.findByPk(req.auth.id);
    if (!exist_customer) return next(Boom.notFound('Customer not found'));

    const { email } = exist_customer.dataValues;
    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound('Customer not found'));
    }
    const [customer] = data;

    let params = `session_id={CHECKOUT_SESSION_ID}&payment_intent_id=${req.query.payment_intent_id}`;
    if (req.query.address_id) params += `&address_id=${req.query.address_id}`;

    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'setup',
      customer: customer.id,
      success_url: `${req.headers.origin}/checkout/payment?${params}`,
      cancel_url: `${req.headers.origin}/checkout/cancel`,
    });

    return res.status(201).json(session.url);
  } catch (error) {
    next(error);
  }
});
// router.post('/', JWT.verify, async (req, res, next) => {
//   try {
//     // Exist Customer in my Own Database
//     const exist_customer = await User.model.findByPk(req.auth.id);
//     if (!exist_customer) return next(Boom.notFound('Customer not found'));

//     // Get Cart Products
//     const cart = await Cart.model.findOne({
//       where: {
//         customerId: req.auth.id,
//       },
//     });
//     if (!cart) return next(Boom.notFound('Cart not found'));

//     const cart_items = await CartProduct.model.findAll({
//       where: {
//         cartId: cart.dataValues.id,
//         visible: true,
//       },
//       include: {
//         model: Product.model,
//         as: 'product',
//       },
//     });
//     if (cart_items.length === 0) {
//       return next(Boom.badRequest('Cart must have at least one product'));
//     }

//     const line_items = cart_items.map((item) => ({
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: item.product.name,
//           images: [
//             'https://b.stripecdn.com/docs-statics-srv/assets/e9d184fcb37d32f21df2171a070f5fbc.png',
//           ],
//           description: item.product.description,
//         },
//         unit_amount: item.product.price * 100,
//       },
//       quantity: item.quantity,
//     }));

//     const session = await Stripe.checkout.sessions.create({
//       success_url: 'http://localhost:5174/checkout/success',
//       cancel_url: 'http://localhost:5174/checkout/cancel',
//       line_items,
//       mode: 'payment',
//     });

//     console.log('CHECKOUT-SESSION', session);

//     return res.status(201).json(session.url);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/:id/expire', async (req, res, next) => {
//   const {
//     id = 'cs_test_a1bl0ySRslh0GhVFo297vmu3yun3QfebcVBrQK02Dc59OkuhMuFiESlJQq',
//   } = req.params;

//   try {
//     const session = await Stripe.checkout.sessions.expire(id);

//     return res.status(200).json(session);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
