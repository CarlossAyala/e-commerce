const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const slugify = require('slugify');
const { Store } = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const JWT = require('../../../middlewares/auth/jwt.auth');
const schema = require('./store.schema');
const slugifyOptions = require('../../../constant/slugify');
const { Op } = require('sequelize');

// Get Store
router.get('/', JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;

  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });

    console.log('Store', store);

    return res.status(200).json(store);
  } catch (error) {
    next(error);
  }
});

// Create Store
router.post(
  '/',
  JWT.verify,
  validatorSchema(schema.base, 'body'),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name, description } = req.body;
    const slug = slugify(name, slugifyOptions);

    try {
      const store = await Store.model.findOne({
        where: {
          [Op.or]: [{ name }, { sellerId }, { slug }],
        },
      });
      if (store?.sellerId === sellerId) {
        return next(Boom.badRequest('You already have a Store'));
      } else if (store?.name === name || store?.slug === slug) {
        return next(Boom.badRequest('Store already exists'));
      }

      const newStore = await Store.model.create({
        name,
        description,
        sellerId,
        slug,
      });

      return res.status(201).json(newStore);
    } catch (error) {
      next(error);
    }
  }
);

// Change Name
router.patch(
  '/change-name',
  JWT.verify,
  validatorSchema(schema.changeName, 'body'),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { name } = req.body;
    const slug = slugify(name, slugifyOptions);

    try {
      const store = await Store.model.findOne({
        where: {
          [Op.or]: [{ name }, { sellerId }, { slug }],
        },
      });
      if (!store || store?.sellerId !== sellerId) {
        return next(Boom.badRequest('Store not found'));
      } else if (store?.name === name || store?.slug === slug) {
        return next(Boom.badRequest('The Store name already exists'));
      }

      await store.update({
        name,
        slug,
      });

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

// Change description
router.patch(
  '/change-description',
  JWT.verify,
  validatorSchema(schema.changeDescription, 'body'),
  async (req, res, next) => {
    const { id: sellerId } = req.auth;
    const { description } = req.body;

    try {
      const store = await Store.model.findOne({
        where: {
          sellerId,
        },
      });
      if (!store) return next(Boom.badRequest('Store not found'));

      await store.update({
        description,
      });

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Store
router.delete('/', JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.badRequest('Store not found'));

    await store.destroy();

    return res.status(200).json({
      message: 'Store deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
