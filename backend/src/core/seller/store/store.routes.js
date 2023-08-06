const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const slugify = require('slugify');
const { Category, Product, Store } = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const JWT = require('../../../middlewares/auth/jwt.auth');
const controllers = require('./store.controller');
const middlewares = require('./store.middleware');
const schemas = require('./store.schema');
const slugifyOptions = require('../../../constant/slugify');

// Get Store info
router.get(
  '/',
  JWT.verify,
  // controller getStore
  async (req, res, next) => {
    try {
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      console.log('Store', store);

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

// Create Store
router.post(
  '/',
  JWT.verify,
  validatorSchema(schemas.base, 'body'),
  // middleware alreadyHaveStore
  async (req, res, next) => {
    try {
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (store) return next(Boom.badRequest('You already have a Store'));

      next();
    } catch (error) {
      next(error);
    }
  },
  // middleware checkDuplicateName
  async (req, res, next) => {
    const { name } = req.body;
    try {
      const store = await Store.model.findOne({
        where: {
          name,
        },
      });

      if (store) return next(Boom.badRequest('The Store name already exists'));

      next();
    } catch (error) {
      next(error);
    }
  },
  // controller createStore
  async (req, res, next) => {
    try {
      const newStore = await Store.model.create({
        ...req.body,
        userId: req.auth.id,
        slug: slugify(req.body.name, slugifyOptions),
      });

      return res.status(201).json(newStore.dataValues);
    } catch (error) {
      next(error);
    }
  }
);

// Change Name
router.patch(
  '/change-name',
  JWT.verify,
  validatorSchema(schemas.changeName, 'body'),
  // middleware existStore
  async (req, res, next) => {
    try {
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (!store) return next(Boom.badRequest('Store not found'));

      next();
    } catch (error) {
      next(error);
    }
  },
  // middleware checkDuplicateName
  async (req, res, next) => {
    const { name } = req.body;
    try {
      const store = await Store.model.findOne({
        where: {
          name,
        },
      });

      if (store) return next(Boom.badRequest('The Store name already exists'));

      next();
    } catch (error) {
      next(error);
    }
  },
  // controller changeName
  async (req, res, next) => {
    // TODO: Posibles slugs duplicados con el mismo nombre
    const { name } = req.body;

    try {
      const updated = await Store.model.update(
        {
          name,
          slug: slugify(name, slugifyOptions),
        },
        {
          where: {
            userId: req.auth.id,
          },
        }
      );

      return res.status(200).json(updated.dataValues);
    } catch (error) {
      next(error);
    }
  }
);

// Change description
router.patch(
  '/change-description',
  JWT.verify,
  validatorSchema(schemas.changeDescription, 'body'),
  // middleware existStore
  async (req, res, next) => {
    try {
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (!store) return next(Boom.badRequest('Store not found'));

      next();
    } catch (error) {
      next(error);
    }
  },
  // controller change-description
  async (req, res, next) => {
    try {
      const updated = await Store.model.update(
        {
          description: req.body.description,
        },
        {
          where: {
            userId: req.auth.id,
          },
        }
      );

      return res.status(200).json(updated.dataValues);
    } catch (error) {
      next(error);
    }
  }
);

// Check Duplicate Store Name
router.post(
  '/check-duplicate-name',
  JWT.verify,
  validatorSchema(schemas.checkName, 'body'),
  // middleware checkDuplicateName
  async (req, res, next) => {
    const { name } = req.body;
    try {
      const store = await Store.model.findOne({
        where: {
          name,
        },
      });

      if (store) {
        return res.status(200).json({
          message: 'The Store name is already taken',
          isTaken: true,
        });
      }

      return res.status(200).json({
        message: 'The Store name is available',
        isTaken: false,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Delete Store
router.delete(
  '/',
  JWT.verify,
  // middleware existStore
  async (req, res, next) => {
    try {
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (!store) return next(Boom.badRequest("You don't have a Store"));

      next();
    } catch (error) {
      next(error);
    }
  },
  // controller deleteStore
  async (req, res, next) => {
    try {
      await Store.model.destroy({
        where: {
          userId: req.auth.id,
        },
      });

      // TODO: Delete all related
      return res.status(200).json({
        message: 'Store deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
