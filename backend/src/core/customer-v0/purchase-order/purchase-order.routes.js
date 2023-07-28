const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const purchaseOrderSchema = require('./purchase-order.schema');
const purchaseOrderMiddleware = require('./purchase-order.middleware');
const purchaseOrderController = require('./purchase-order.controller');

// Get All
router.get('/', apiMiddleware.validateJWT(), purchaseOrderController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(purchaseOrderSchema.resourceId, 'params'),
  purchaseOrderMiddleware.resourceExist,
  purchaseOrderController.getOne
);

module.exports = router;
