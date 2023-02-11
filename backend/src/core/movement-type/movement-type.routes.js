const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const movementTypeSchema = require('./movement-type.schema');
const movementTypeMiddleware = require('./movement-type.middleware');
const movementTypeController = require('./movement-type.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, movementTypeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(movementTypeSchema.resourceId, 'params'),
  movementTypeMiddleware.resourceExist,
  movementTypeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(movementTypeSchema.create, 'body'),
  movementTypeController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(movementTypeSchema.resourceId, 'params'),
  validatorHandler(movementTypeSchema.update, 'body'),
  movementTypeMiddleware.resourceExist,
  movementTypeController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(movementTypeSchema.resourceId, 'params'),
  movementTypeMiddleware.resourceExist,
  movementTypeController.remove
);

module.exports = router;
