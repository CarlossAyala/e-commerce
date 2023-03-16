const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./product.schema');
const middleware = require('./product.middleware');
const controller = require('./product.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, controller.getAll);

// Get One
router.get(
  '/:id',
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(schema.base, 'body'),
  controller.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.base, 'body'),
  middleware.resourceExist,
  controller.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.remove
);

module.exports = router;
