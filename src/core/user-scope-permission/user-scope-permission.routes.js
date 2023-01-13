const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const userScopePermissionSchema = require('./user-scope-permission.schema');
const userScopePermissionMiddleware = require('./user-scope-permission.middleware');
const userScopePermissionController = require('./user-scope-permission.controller');

// Get All
router.get(
  '/',
  apiMiddleware.validateJWT,
  userScopePermissionController.getAll
);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopePermissionSchema.resourceId, 'params'),
  userScopePermissionMiddleware.resourceExist,
  userScopePermissionController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(userScopePermissionSchema.create, 'body'),
  userScopePermissionController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopePermissionSchema.resourceId, 'params'),
  validatorHandler(userScopePermissionSchema.update, 'body'),
  userScopePermissionMiddleware.resourceExist,
  userScopePermissionController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userScopePermissionSchema.resourceId, 'params'),
  userScopePermissionMiddleware.resourceExist,
  userScopePermissionController.remove
);

module.exports = router;
