const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const {
  Category,
  Product,
  Review,
  Store,
} = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./category.schema');
const { Op } = require('sequelize');
const sequelize = require('../../../database/mysql');

router.get('/full-list', async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: {
        model: Category.model,
        as: 'children',
        separate: true,
        order: [['name', 'ASC']],
      },
      order: [['name', 'ASC']],
    });

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// By Slug Single
router.get(
  '/:slug',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const category = await Category.model.findOne({
        where: {
          slug,
        },
      });

      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

// By Slug List
router.get(
  '/:slug/list',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      let category = await Category.model.findOne({
        where: {
          slug,
        },
      });

      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      // Checkear si es una Categoria principal
      if (category.dataValues.parentId) {
        category = await Category.model.findOne({
          where: {
            id: category.dataValues.parentId,
          },
          include: {
            model: Category.model,
            as: 'children',
            separate: true,
            order: [['name', 'ASC']],
          },
        });
      } else {
        category = await Category.model.findOne({
          where: {
            id: category.dataValues.id,
          },
          include: {
            model: Category.model,
            as: 'children',
            separate: true,
            order: [['name', 'ASC']],
          },
        });
      }

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

// Get Product Best Sellers by Category Slug
router.get(
  '/:slug/best-sellers',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const category = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      const products = await Product.model.findAll({
        where: {
          categoryId: category.dataValues.id,
          stock: {
            [Op.gt]: 0,
          },
        },
        order: [['sold', 'DESC']],
        limit: 20,
        offset: 0,
      });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// Get Product Top Rated by Category Slug
router.get(
  '/:slug/top-rated',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const category = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      let reviews = await Review.model.findAll({
        attributes: [
          'productId',
          [sequelize.fn('AVG', sequelize.col('rating')), 'avarage'],
          [sequelize.fn('COUNT', sequelize.col('Review.id')), 'count'],
        ],
        include: {
          model: Product.model,
          as: 'product',
          where: {
            categoryId: category.dataValues.id,
            stock: {
              [Op.gt]: 0,
            },
            available: {
              [Op.is]: true,
            },
          },
          required: true,
        },
        group: ['productId'],
        order: [
          [
            {
              model: Product.model,
              as: 'product',
            },
            'sold',
            'DESC',
          ],
          ['count', 'DESC'],
          ['avarage', 'DESC'],
        ],
        limit: 20,
        offset: 0,
      });

      for (const review of reviews) {
        review.dataValues.avarage = Number(review.dataValues.avarage).toFixed(
          2
        );
      }

      return res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

// Get Product Random by Category Slug
router.get(
  '/:slug/random',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const category = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      const products = await Product.model.findAll({
        where: {
          categoryId: category.dataValues.id,
          stock: {
            [Op.gt]: 0,
          },
          available: {
            [Op.is]: true,
          },
        },
        order: sequelize.random(),
        limit: 20,
        offset: 0,
      });

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

// Get Stores by Category Slug
router.get(
  '/:slug/stores',
  validatorSchema(schemas.resourceSlug, 'params'),
  async (req, res, next) => {
    const { slug } = req.params;

    try {
      const category = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (!category) {
        return next(Boom.notFound('Category not found'));
      }

      const stores = await Store.model.findAll({
        attributes: {
          exclude: ['userId'],
        },
        include: {
          model: Product.model,
          as: 'products',
          where: {
            categoryId: category.dataValues.id,
          },
          attributes: [],
        },
        order: sequelize.random(),
        limit: 20,
        offset: 0,
      });

      return res.status(200).json(stores);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
