const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const scopeSchema = require('./scope.schema');
const scopeMiddleware = require('./scope.middleware');
const scopeController = require('./scope.controller');

// CREATE
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.create, 'body'),
  scopeMiddleware.userAuthorization,
  scopeController.create
);

// READ ALL
router.get(
  '/',
  apiMiddleware.validateJWT,
  scopeMiddleware.userAuthorization,
  scopeController.getAll
);
// READ ONE
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.scopeId, 'params'),
  scopeMiddleware.userAuthorization,
  scopeController.getOne
);

// UPDATE
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.scopeId, 'params'),
  validatorHandler(scopeSchema.update, 'body'),
  scopeMiddleware.userAuthorization,
  scopeController.update
);

// DELETE
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(scopeSchema.scopeId, 'params'),
  scopeMiddleware.userAuthorization,
  scopeController.remove
);

module.exports = router;
