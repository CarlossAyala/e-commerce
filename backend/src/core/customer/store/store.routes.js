const express = require('express');
const Boom = require('@hapi/boom');
const { Store, Product } = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./store.schema');
const router = express.Router();

// Get All
router.get('/', async (req, res, next) => {
  try {
    const stores = await Store.model.findAndCountAll({
      order: [['name', 'ASC']],
      limit: 50,
      offset: 0,
    });

    return res.status(200).json(stores);
  } catch (err) {
    next(err);
  }
});

// Get by slug
router.get(
  '/:slug',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const store = await Store.model.findOne({
        attributes: {
          exclude: ['userId'],
        },
        where: { slug },
      });

      if (!store) {
        throw Boom.notFound('Store not found');
      }

      return res.status(200).json(store);
    } catch (err) {
      next(err);
    }
  }
);

// Get Products Store by slug
router.get(
  '/:slug/products',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const store = await Store.model.findOne({
        attributes: {
          exclude: ['userId'],
        },
        where: { slug },
      });
      if (!store) {
        throw Boom.notFound('Store not found');
      }

      const products = await Product.model.findAndCountAll({
        where: { storeId: store.dataValues.id },
        limit: 30,
        offset: 0,
      });

      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
