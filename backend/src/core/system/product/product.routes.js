const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const QueryBuilder = require('../../../utils/database/query-builder');
const {
  Product,
  Question,
  Answer,
  Store,
} = require('../../../database/mysql/models');
const { validateJWT } = require('../../../middlewares/api');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./product.schema');

// Searcher
router.get('/search', async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike('name', req.query.q)
    .orderBy('name', 'ASC')
    .withPagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll({
      attributes: ['id', 'name', 'price', 'slug'],
      ...qb,
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get Product
router.get(
  '/:id',
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const { id: productId } = req.params;

    try {
      // TODO: Pedir Store por su Endpoint
      const product = await Product.model.findByPk(productId, {
        include: {
          model: Store.model,
          as: 'store',
        },
      });
      if (!product) {
        return next(Boom.notFound('Product not found'));
      }

      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Get Product QAs
router.get(
  '/:id/QA',
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const qb = new QueryBuilder(req.query)
      .where('states', Question.enums.states.answered)
      .where('productId', req.params.id)
      .orderBy('createdAt', 'ASC')
      .withPagination()
      .build();

    try {
      const QA = await Question.model.findAndCountAll({
        ...qb,
        include: {
          model: Answer.model,
          as: 'answer',
        },
      });

      return res.status(200).json(QA);
    } catch (error) {
      next(error);
    }
  }
);

// Get Product CustomerQAs
router.get(
  '/:id/customerQA',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const qb = new QueryBuilder(req.query)
      .where('customerId', req.auth.id)
      .where('productId', req.params.id)
      .orderBy('createdAt', 'ASC')
      .withPagination()
      .build();

    try {
      const QA = await Question.model.findAndCountAll({
        ...qb,
        include: {
          model: Answer.model,
          as: 'answer',
          required: false,
        },
      });

      return res.status(200).json(QA);
    } catch (error) {
      next(error);
    }
  }
);

// New Question Product
router.post(
  '/:id/questions',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.newQuestion, 'body'),
  async (req, res, next) => {
    try {
      const question = await Question.model.create({
        question: req.body.question,
        customerId: req.auth.id,
        productId: req.params.id,
      });

      return res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
