const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const Stripe = require("./stripe.connection");
const { User } = require("../../database/mysql/models");
const { JWT } = require("../../middlewares");

router.get("/", JWT.verify, async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { email } = existCustomer.dataValues;

    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length === 0) {
      return next(Boom.notFound("Customer not found"));
    }

    const [customer] = data;

    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.post("/", JWT.verify, async (req, res, next) => {
  const customerId = req.auth.id;

  try {
    const existCustomer = await User.model.findByPk(customerId);
    if (!existCustomer) return next(Boom.notFound("Customer not found"));

    const { name, lastName, email } = existCustomer.dataValues;

    const { data } = await Stripe.customers.search({
      query: `email:"${email}"`,
    });
    if (data.length > 0) {
      return next(Boom.badRequest("Email customer already taken"));
    }

    const customer = await Stripe.customers.create({
      name: `${name} ${lastName}`,
      email,
    });

    return res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
});

// router.patch('/', JWT.verify, async (req, res, next) => {
//   const customerId = req.auth.id;

//   try {
//     const existCustomer = await User.model.findByPk(customerId);
//     if (!existCustomer) return next(Boom.notFound('Customer not found'));

//     const { email } = existCustomer.dataValues;

//     const { data } = await Stripe.customers.search({
//       query: `email:"${email}"`,
//     });
//     if (data.length === 0) {
//       return next(Boom.notFound('Customer not found'));
//     }

//     const updated_customer = await Stripe.customers.update(data[0].id, {
//       metadata: { order_id: '6735' },
//     });

//     return res.status(200).json(updated_customer);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
