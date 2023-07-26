const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Product, Bookmark } = require('../../../database/mysql/models');
const { validateJWT } = require('../../../middlewares/api');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./bookmark.schema');

// Get Bookmarks
router.get('/', validateJWT, async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.model.findAndCountAll({
      where: {
        customerId: req.auth.id,
      },
    });

    return res.status(200).json(bookmarks);
  } catch (error) {
    next(error);
  }
});

// Add Bookmark
router.post(
  '/',
  validateJWT,
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    try {
      const { productId } = req.body;

      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound('Product not found'));

      const bookmark = await Bookmark.model.create({
        customerId: req.auth.id,
        productId,
      });

      return res.status(200).json(bookmark);
    } catch (error) {
      next(error);
    }
  }
);

// Clear Bookmark
router.delete('/clear', validateJWT, async (req, res, next) => {
  try {
    await Bookmark.model.destroy({
      where: {
        customerId: req.auth.id,
      },
    });

    return res.status(200).json({ message: 'Bookmarks cleared' });
  } catch (error) {
    next(error);
  }
});

// Remove Bookmark
router.delete(
  '/:id',
  validateJWT,
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    try {
      const productId = req.params.id;

      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound('Product not found'));

      const bookmark = await Bookmark.model.findOne({
        where: {
          customerId: req.auth.id,
          productId,
        },
      });
      if (!bookmark) return next(Boom.notFound('Bookmark not found'));

      await bookmark.destroy();

      return res.status(200).json({ message: 'Bookmark removed' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
