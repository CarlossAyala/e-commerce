const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const scopeSchema = require('./scope.schema');
const scopeMiddleware = require('./scope.middleware');
const scopeController = require('./scope.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, scopeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.resourceId, 'params'),
  scopeMiddleware.scopeExist,
  scopeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.create, 'body'),
  scopeController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.resourceId, 'params'),
  validatorHandler(scopeSchema.update, 'body'),
  scopeMiddleware.scopeExist,
  scopeController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.resourceId, 'params'),
  scopeMiddleware.scopeExist,
  scopeController.remove
);

module.exports = router;
