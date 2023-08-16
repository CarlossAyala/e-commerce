const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const {
  Product,
  Store,
  Question,
  User,
  Answer,
} = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const QueryBuilder = require('../../../utils/database/query-builder');
const schemas = require('./question.schema');
const sequelize = require('../../../database/mysql');

// Get Products Questions
router.get('/', JWT.verify, async (req, res, next) => {
  const qbQuestion = new QueryBuilder(req.query)
    .orderBy('total', 'DESC')
    .pagination()
    .build();

  try {
    // middleware userHasStore
    const store = await Store.model.findOne({
      where: {
        userId: req.auth.id,
      },
    });

    if (!store) return next(Boom.notFound('Store not found'));

    const qbProduct = new QueryBuilder(req.query)
      .where('storeId', store.dataValues.id)
      .whereLike('name', req.query.q)
      .whereIn('states', Question.enums.states.queue)
      .build();

    console.log('QUERY BUILDER', qbProduct);
    // TODO: Refactorizar
    const products = await Question.model.findAndCountAll({
      attributes: [
        'product_id',
        [sequelize.fn('COUNT', sequelize.col('product_id')), 'total'],
      ],
      where: {
        states: Question.enums.states.queue,
      },
      include: {
        model: Product.model,
        attributes: ['id', 'name', 'available'],
        where: qbProduct.where,
        as: 'product',
      },
      group: ['Question.product_id'],
      order: qbQuestion.order,
      limit: qbQuestion.limit,
      offset: qbQuestion.offset,
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// Get Product Questions
router.get(
  '/product/:id',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const qb = new QueryBuilder(req.query)
      .where('productId', req.params.id)
      .where('states', Question.enums.states.queue)
      .whereLike('name', req.query.q)
      .orderBy('createdAt', 'DESC')
      .pagination()
      .build();

    try {
      // middleware userHasStore
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (!store) return next(Boom.notFound('Store not found'));

      const questions = await Question.model.findAndCountAll({
        include: {
          model: User.model,
          as: 'customer',
          attributes: [
            [
              sequelize.fn(
                'CONCAT',
                sequelize.col('name'),
                ' ',
                sequelize.col('last_name')
              ),
              'name',
            ],
          ],
        },
        ...qb,
      });

      return res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }
);

// Get Question
router.get(
  '/:id/product',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    try {
      // middleware userHasStore
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });

      if (!store) return next(Boom.notFound('Store not found'));

      const question = await Question.model.findByPk(req.params.id, {
        include: [
          {
            model: User.model,
            as: 'customer',
            attributes: [
              [
                sequelize.fn(
                  'CONCAT',
                  sequelize.col('customer.name'),
                  ' ',
                  sequelize.col('customer.last_name')
                ),
                'name',
              ],
            ],
          },
          {
            model: Product.model,
            as: 'product',
            where: {
              storeId: store.dataValues.id,
            },
            attributes: [],
          },
        ],
      });

      if (!question) return next(Boom.notFound('Question not found'));

      return res.status(200).json(question);
    } catch (error) {
      next(error);
    }
  }
);

// Create Answer to Question
router.post(
  '/:id/product',
  JWT.verify,
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.answer, 'body'),
  async (req, res, next) => {
    try {
      // middleware userHasStore
      const store = await Store.model.findOne({
        where: {
          userId: req.auth.id,
        },
      });
      if (!store) return next(Boom.notFound('Store not found'));

      const question = await Question.model.findByPk(req.params.id, {
        include: {
          model: Product.model,
          as: 'product',
          where: {
            storeId: store.dataValues.id,
          },
        },
      });
      if (!question) return next(Boom.notFound('Question not found'));

      if (req.body.answer) {
        const futureAnswer = await sequelize.transaction(async (t) => {
          const answer = await Answer.model.create(
            {
              answer: req.body.answer,
              employeeId: req.auth.id,
              questionId: question.dataValues.id,
            },
            {
              transaction: t,
            }
          );

          await Question.model.update(
            {
              states: Question.enums.states.answered,
            },
            {
              where: {
                id: question.dataValues.id,
              },
              transaction: t,
            }
          );

          return answer;
        });

        return res.status(200).json(futureAnswer);
      } else {
        // Cambiar el state de la pregunta
        await Question.model.update(
          {
            states: Question.enums.states.rejected,
          },
          {
            where: {
              id: question.dataValues.id,
            },
          }
        );

        return res.status(200).json({
          message: 'Question state updated',
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
