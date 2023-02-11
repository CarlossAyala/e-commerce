const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const chargeSchema = require('./charge.schema');
const chargeMiddleware = require('./charge.middleware');
const chargeController = require('./charge.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, chargeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeSchema.resourceId, 'params'),
  chargeMiddleware.resourceExist,
  chargeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(chargeSchema.create, 'body'),
  chargeController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeSchema.resourceId, 'params'),
  validatorHandler(chargeSchema.update, 'body'),
  chargeMiddleware.resourceExist,
  chargeController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeSchema.resourceId, 'params'),
  chargeMiddleware.resourceExist,
  chargeController.remove
);

module.exports = router;
