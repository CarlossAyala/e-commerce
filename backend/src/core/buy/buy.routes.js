const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const buySchema = require('./buy.schema');
const buyMiddleware = require('./buy.middleware');
const buyController = require('./buy.controller');

// Buy Shopping Cart
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(buySchema.buy, 'body'),
  buyMiddleware.checkCartItems,
  buyMiddleware.checkDestination,
  buyMiddleware.checkPaymentMethod,
  buyMiddleware.checkBalance,
  buyController.buy
);

module.exports = router;
