const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const cartItemSchema = require('./cart-item.schema');
const cartItemMiddleware = require('./cart-item.middleware');
const cartItemController = require('./cart-item.controller');

// Add product
router.post(
  '/:productId',
  apiMiddleware.validateJWT,
  validatorHandler(cartItemSchema.productId, 'params'),
  validatorHandler(cartItemSchema.addProduct, 'body'),
  cartItemMiddleware.productExist,
  cartItemController.addProduct
);

// Get Cart
router.get('/', apiMiddleware.validateJWT, cartItemController.getCart);

// Update Product
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cartItemSchema.resourceId, 'params'),
  validatorHandler(cartItemSchema.updateProduct, 'body'),
  cartItemMiddleware.resourceExist,
  cartItemController.updateProduct
);

// Remove Product
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cartItemSchema.resourceId, 'params'),
  cartItemMiddleware.resourceExist,
  cartItemController.removeProduct
);

// Clear Cart
router.delete('/', apiMiddleware.validateJWT, cartItemController.clearCart);

module.exports = router;
