const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const permissionSchema = require('./permission.schema');
const permissionMiddleware = require('./permission.middleware');
const permissionController = require('./permission.controller');

// CREATE
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.create, 'body'),
  permissionMiddleware.userExist,
  permissionMiddleware.userAuthorization,
  permissionMiddleware.scopeExist,
  permissionMiddleware.alreadyHasPermission,
  permissionController.create
);

// READ ALL
router.get(
  '/',
  apiMiddleware.validateJWT,
  permissionMiddleware.userAuthorization,
  permissionController.getAll
);
// READ ONE
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.scopeId, 'params'),
  permissionMiddleware.userAuthorization,
  permissionController.getOne
);

// DELETE
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.scopeId, 'params'),
  permissionMiddleware.userAuthorization,
  permissionController.remove
);

module.exports = router;
