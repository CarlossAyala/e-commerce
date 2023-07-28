const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Product, Question } = require('../../../database/mysql/models');
const { validateJWT } = require('../../../middlewares/api');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./question.schema');

// Create Question
router.post(
  '/product/:id',
  validateJWT(),
  validatorSchema(schemas.base),
  async (req, res, next) => {
    const { question } = req.body;

    try {
      // product-exist
      const product = await Product.model.findByPk(req.params.id);
      if (!product) return next(Boom.notFound('Product not found'));

      // question-create
      const newQuestion = await Question.model.create({
        question,
        states: Question.enums.states.queue,
        customerId: req.auth.id,
        productId: product.dataValues.id,
      });

      return res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }
);

// Delete Question
router.post(
  '/product/:id',
  validateJWT(),
  validatorSchema(schemas.base),
  async (req, res, next) => {
    const { question } = req.body;

    try {
      // product-exist
      const product = await Product.model.findByPk(req.params.id);
      if (!product) return next(Boom.notFound('Product not found'));

      // question-create
      const newQuestion = await Question.model.create({
        question,
        states: Question.enums.states.queue,
        customerId: req.auth.id,
        productId: product.dataValues.id,
      });

      return res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
