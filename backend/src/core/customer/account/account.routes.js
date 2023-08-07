const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { User, Cart } = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./account.schema');
const Encrypter = require('../../../middlewares/auth/encrypter');
const JWT = require('../../../middlewares/auth/jwt.auth');

router.post(
  '/signup',
  validatorSchema(schemas.signup, 'body'),
  async (req, res, next) => {
    const { name, lastName, email, password } = req.body;

    try {
      const alreadyExists = await User.model.findOne({
        where: {
          email,
        },
      });
      if (alreadyExists) {
        return next(Boom.badRequest('Email already exists'));
      }

      const encryptedPassword = await Encrypter.hash(password);
      const customer = await User.model.create({
        name,
        lastName,
        email,
        password: encryptedPassword,
      });

      await Cart.model.create({
        customerId: customer.dataValues.id,
      });

      return res.status(201).json({
        message: 'Account created successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signin',
  validatorSchema(schemas.signin, 'body'),
  async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const customer = await User.model.findOne({
        where: { email },
      });
      if (!customer) {
        return next(
          Boom.badRequest('Please provide a valid email address or password')
        );
      }

      const valid = await Encrypter.compare(
        password,
        customer.dataValues.password
      );
      if (!valid) {
        return next(
          Boom.badRequest('Please provide a valid email address or password')
        );
      }

      const token = await JWT.sign({
        id: customer.dataValues.id,
      });

      delete customer.dataValues.password;

      return res.status(200).json({
        token,
        customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/profile', JWT.verify, async (req, res, next) => {
  const { id } = req.auth;

  try {
    const customer = await User.model.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: { id },
    });
    if (!customer) {
      return next(Boom.notFound('Customer not found'));
    }

    return res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/change-name',
  JWT.verify,
  validatorSchema(schemas.changeName, 'body'),
  async (req, res, next) => {
    const { id } = req.auth;
    const { name, lastName } = req.body;

    try {
      const customer = await User.model.findOne({
        attributes: {
          exclude: ['password'],
        },
        where: { id },
      });
      if (!customer) {
        return next(Boom.notFound('Customer not found'));
      }

      await customer.update({ name, lastName });

      return res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/change-password',
  JWT.verify,
  validatorSchema(schemas.changePassword, 'body'),
  async (req, res, next) => {
    const { id } = req.auth;
    const { oldPassword, newPassword } = req.body;

    try {
      const customer = await User.model.findOne({
        where: { id },
      });
      if (!customer) {
        return next(Boom.notFound('Customer not found'));
      }

      const equal = await Encrypter.compare(
        oldPassword,
        customer.dataValues.password
      );
      if (!equal) {
        return next(Boom.badRequest('Old password is incorrect'));
      }
      if (oldPassword === newPassword) {
        return next(
          Boom.badRequest('New password must be different from old one')
        );
      }

      const encryptedPassword = await Encrypter.hash(newPassword);
      await customer.update({ password: encryptedPassword });

      return res.status(200).json({
        message: 'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
