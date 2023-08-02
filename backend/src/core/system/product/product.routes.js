const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const QueryBuilder = require('../../../utils/database/query-builder');
const { Product, Store } = require('../../../database/mysql/models');
const { validateJWT } = require('../../../middlewares/api');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./product.schema');
const { Op } = require('sequelize');

// Searcher
router.get('/search', async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike('name', req.query.q)
    .orderBy('name', 'ASC')
    .withPagination()
    .build();

  try {
    const products = await Product.model.findAndCountAll({
      attributes: {
        exclude: ['storeId'],
      },
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

// Get Related Products
router.get(
  '/:id/related',
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const { id: productId } = req.params;

    try {
      const product = await Product.model.findByPk(productId);
      if (!product) {
        return next(Boom.notFound('Product not found'));
      }

      const qb = new QueryBuilder(req.query).withPagination().build();
      const related = await Product.model.findAll({
        where: {
          [Op.or]: {
            categoryId: product.dataValues.categoryId,
            storeId: product.dataValues.storeId,
          },
          [Op.not]: {
            id: product.dataValues.id,
          },
        },
        ...qb,
      });

      return res.status(200).json(related);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
