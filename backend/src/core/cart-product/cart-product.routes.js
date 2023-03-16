const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./cart.schema');
const middleware = require('./cart.middleware');
const controller = require('./cart.controller');

// Get Cart
router.get('/', apiMiddleware.validateJWT, controller.getCart);

// Add product
router.post(
  '/:productId',
  apiMiddleware.validateJWT,
  validatorHandler(schema.productId, 'params'),
  validatorHandler(schema.addProduct, 'body'),
  middleware.productExist,
  controller.addProduct
);

// Update Product
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.resourceId, 'params'),
  validatorHandler(schema.updateProduct, 'body'),
  middleware.resourceExist,
  controller.updateProduct
);

// Remove Product
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.resourceId, 'params'),
  middleware.resourceExist,
  controller.removeProduct
);

// Clear Cart
router.delete('/', apiMiddleware.validateJWT, controller.clearCart);

module.exports = router;
