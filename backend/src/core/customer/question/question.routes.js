const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Product, Question, Answer } = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./question.schema');
const QueryBuilder = require('../../../utils/database/query-builder');

router.get(
  '/product/:id',
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const qb = new QueryBuilder(req.query)
      .where('states', Question.enums.states.answered)
      .where('productId', req.params.id)
      .orderBy('createdAt', 'DESC')
      .withPagination()
      .build();

    try {
      const QAs = await Question.model.findAndCountAll({
        ...qb,
        include: {
          model: Answer.model,
          as: 'answer',
        },
      });

      return res.status(200).json(QAs);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/product/:id/customer',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const qb = new QueryBuilder(req.query)
      .where('customerId', req.auth.id)
      .where('productId', req.params.id)
      .orderBy('createdAt', 'DESC')
      .withPagination()
      .build();

    try {
      const QAs = await Question.model.findAndCountAll({
        ...qb,
        include: {
          model: Answer.model,
          as: 'answer',
        },
      });

      return res.status(200).json(QAs);
    } catch (error) {
      next(error);
    }
  }
);

// Create Question
router.post(
  '/:id',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { id: customerId } = req.auth;
    const { question } = req.body;

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound('Product not found'));

      const newQuestion = await Question.model.create({
        question,
        states: Question.enums.states.queue,
        customerId,
        productId,
      });

      return res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
