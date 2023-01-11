const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const permissionSchema = require('./permission.schema');
const permissionMiddleware = require('./permission.middleware');
const permissionController = require('./permission.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, permissionController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.resourceId, 'params'),
  permissionMiddleware.permissionExist,
  permissionController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.create, 'body'),
  permissionController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.resourceId, 'params'),
  validatorHandler(permissionSchema.update, 'body'),
  permissionMiddleware.permissionExist,
  permissionController.update
);

// DELETE
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(permissionSchema.resourceId, 'params'),
  permissionMiddleware.permissionExist,
  permissionController.remove
);

module.exports = router;
