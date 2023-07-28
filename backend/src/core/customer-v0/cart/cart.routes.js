const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./cart.schema');
const middleware = require('./cart.middleware');
const controller = require('./cart.controller');

// Get Cart
router.get('/', apiMiddleware.validateJWT(), controller.getCart);

// Add product
router.post(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.baseQuantity, 'body'),
  middleware.productExist,
  controller.addItem
);

// Update Quantity Product
router.patch(
  '/quantity/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.baseQuantity, 'body'),
  middleware.resourceExist,
  controller.updateQuantity
);

// Update Visible Product
router.patch(
  '/visibility/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.updateVisible
);

// Clear Cart
router.delete('/clear', apiMiddleware.validateJWT(), controller.clearCart);

// Remove Product
router.delete(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.removeItem
);

module.exports = router;
