const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Address } = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./address.schema');

// Get All
router.get('/', JWT.verify, async (req, res, next) => {
  try {
    const addresses = await Address.model.findAll({
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
});

// Get One
router.get(
  '/:id',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;

    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound('Address not found'));

      return res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Create
router.post(
  '/',
  JWT.verify,
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    try {
      const customerId = req.auth.id;
      const { body } = req;

      const address = await Address.model.create({
        ...body,
        customerId,
      });

      return res.status(201).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Update
router.put(
  '/:id',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;

    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound('Address not found'));

      await address.update(req.body);

      return res.status(200).json(address);
    } catch (error) {
      next(error);
    }
  }
);

// Delete
router.delete(
  '/:id',
  JWT.verify,
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    const customerId = req.auth.id;
    try {
      const address = await Address.model.findOne({
        where: {
          id,
          customerId,
        },
      });
      if (!address) return next(Boom.notFound('Address not found'));

      await address.destroy();

      return res.status(200).json({
        message: 'Address deleted',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
