const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const {
  Product,
  Cart,
  CartProduct,
} = require('../../../database/mysql/models');
const { validateJWT } = require('../../../middlewares/api');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./cart.schema');
const QueryBuilder = require('../../../utils/database/query-builder');

// Get Cart
router.get('/', validateJWT(), async (req, res, next) => {
  const CartProductQB = new QueryBuilder(req.query)
    .where('visible', req.query.only_visible ? true : null)
    .build();

  try {
    // midd
    const cart = await Cart.model.findOne({
      where: {
        customerId: req.auth.id,
      },
    });
    if (!cart) return next(Boom.notFound('Cart not found'));

    const items = await CartProduct.model.findAll({
      where: {
        cartId: cart.dataValues.id,
        ...CartProductQB.where,
      },
      include: {
        model: Product.model,
        as: 'product',
      },
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).json(items);
  } catch (error) {
    next(error);
  }
});

// Add Item
router.post(
  '/product/:id',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    const { id: productId } = req.params;
    const { id: customerId } = req.auth;
    const { quantity } = req.body;

    try {
      const cart = await Cart.model.findOne({
        where: {
          customerId,
        },
      });
      if (!cart) return next(Boom.notFound('Cart not found'));

      const product = await Product.model.findByPk(productId);
      if (!product) return next(Boom.notFound('Product not found'));
      if (!product.dataValues.available) {
        return next(Boom.badRequest('Product unavailable'));
      }
      if (product.dataValues.stock === 0) {
        return next(Boom.badRequest('Product out of stock'));
      }
      if (quantity > product.dataValues.stock) {
        return next(Boom.badRequest('Product does not have enough stock'));
      }

      const [item, created] = await CartProduct.model.findOrCreate({
        where: {
          cartId: cart.dataValues.id,
          productId,
        },
        defaults: {
          quantity,
          cartId: cart.dataValues.id,
          productId,
        },
      });

      if (!created) {
        item.quantity += quantity;
        await item.save();
      }

      return res.status(created ? 201 : 200).json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Update Item
router.patch(
  '/:id',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  validatorSchema(schemas.base, 'body'),
  async (req, res, next) => {
    try {
      const cart = await Cart.model.findOne({
        where: {
          customerId: req.auth.id,
        },
      });
      if (!cart) return next(Boom.notFound('Cart not found'));

      const cartItem = await CartProduct.model.findOne({
        where: {
          id: req.params.id,
          cartId: cart.dataValues.id,
        },
      });
      if (!cartItem) return next(Boom.notFound('Item Cart not found'));

      const product = await Product.model.findByPk(
        cartItem.dataValues.productId
      );
      if (!product) return next(Boom.notFound('Product not found'));
      if (product.dataValues.stock === 0) {
        return next(Boom.badRequest('Product out of stock'));
      }
      if (!product.dataValues.available) {
        return next(Boom.badRequest('Product unavailable'));
      }
      if (req.body.quantity > product.dataValues.stock) {
        return next(Boom.badRequest('Product does not have enough stock'));
      }

      const quantity = req.body.quantity;

      const item = await CartProduct.model.update(
        {
          quantity,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Update Visibility Item
router.patch(
  '/:id/visibility',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    try {
      const cart = await Cart.model.findOne({
        where: {
          customerId: req.auth.id,
        },
      });
      if (!cart) return next(Boom.notFound('Cart not found'));

      const cartItem = await CartProduct.model.findOne({
        where: {
          id: req.params.id,
          cartId: cart.dataValues.id,
        },
      });
      if (!cartItem) return next(Boom.notFound('Item Cart not found'));

      const product = await Product.model.findByPk(
        cartItem.dataValues.productId
      );
      if (!product) return next(Boom.notFound('Product not found'));

      await CartProduct.model.update(
        {
          visible: !cartItem.dataValues.visible,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.status(200).json({
        message: 'Item updated',
      });
    } catch (error) {
      next(error);
    }
  }
);

// Clear Cart
router.delete('/clear', validateJWT(), async (req, res, next) => {
  try {
    const cart = await Cart.model.findOne({
      where: {
        customerId: req.auth.id,
      },
    });
    if (!cart) return next(Boom.notFound('Cart not found'));

    await CartProduct.model.destroy({
      where: {
        cartId: cart.dataValues.id,
      },
    });

    return res.status(200).json({
      message: 'Clear Cart',
    });
  } catch (error) {
    next(error);
  }
});

// Remove from Cart
router.delete(
  '/:id',
  validateJWT(),
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    try {
      const cart = await Cart.model.findOne({
        where: {
          customerId: req.auth.id,
        },
      });
      if (!cart) return next(Boom.notFound('Cart not found'));

      const cartItem = await CartProduct.model.findOne({
        where: {
          id: req.params.id,
          cartId: cart.dataValues.id,
        },
      });
      if (!cartItem) return next(Boom.notFound('Item Cart not found'));

      await CartProduct.model.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        message: 'Item removed',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
