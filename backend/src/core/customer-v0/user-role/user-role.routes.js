const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const userRoleSchema = require('./user-role.schema');
const userRoleMiddleware = require('./user-role.middleware');
const userRoleController = require('./user-role.controller');

// Get All
router.get('/', apiMiddleware.validateJWT(), userRoleController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(userRoleSchema.resourceId, 'params'),
  userRoleMiddleware.userRoleExist,
  userRoleController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT(),
  validatorHandler(userRoleSchema.create, 'body'),
  userRoleController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(userRoleSchema.resourceId, 'params'),
  validatorHandler(userRoleSchema.update, 'body'),
  userRoleMiddleware.userRoleExist,
  userRoleController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(userRoleSchema.resourceId, 'params'),
  userRoleMiddleware.userRoleExist,
  userRoleController.remove
);

module.exports = router;
