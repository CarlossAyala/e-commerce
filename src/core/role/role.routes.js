const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const roleSchema = require('./role.schema');
const roleMiddleware = require('./role.middleware');
const roleController = require('./role.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, roleController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(roleSchema.resourceId, 'params'),
  roleMiddleware.roleExist,
  roleController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(roleSchema.create, 'body'),
  roleController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(roleSchema.resourceId, 'params'),
  validatorHandler(roleSchema.update, 'body'),
  roleMiddleware.addressExist,
  roleController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(roleSchema.resourceId, 'params'),
  roleMiddleware.addressExist,
  roleController.remove
);

module.exports = router;
