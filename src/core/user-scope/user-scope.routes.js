const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const userScopeSchema = require('./user-scope.schema');
const userScopeMiddleware = require('./user-scope.middleware');
const userScopeController = require('./user-scope.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, userScopeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopeSchema.resourceId, 'params'),
  userScopeMiddleware.resourceExist,
  userScopeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(userScopeSchema.create, 'body'),
  userScopeController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopeSchema.resourceId, 'params'),
  validatorHandler(userScopeSchema.update, 'body'),
  userScopeMiddleware.resourceExist,
  userScopeController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopeSchema.resourceId, 'params'),
  userScopeMiddleware.resourceExist,
  userScopeController.remove
);

module.exports = router;
