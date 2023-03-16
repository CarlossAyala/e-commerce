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
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.base, 'body'),
  middleware.productExist,
  controller.addItem
);

// Update Product
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.base, 'body'),
  middleware.resourceExist,
  controller.updateItem
);

// Clear Cart
router.delete('/clear', apiMiddleware.validateJWT, controller.clearCart);

// Remove Product
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.removeItem
);

module.exports = router;
