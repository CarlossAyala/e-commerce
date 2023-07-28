const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./question.schema');
const middleware = require('./question.middleware');
const controller = require('./question.controller');

// Get All
router.get(
  '/product/:id',
  validatorHandler(schema.resourceId, 'params'),
  middleware.productExist,
  controller.getAll
);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.resourceId, 'params'),
  middleware.resourceExist,
  controller.getOne
);

// Create
router.post(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.resourceId, 'params'),
  validatorHandler(schema.create, 'body'),
  middleware.productExist,
  controller.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.resourceId, 'params'),
  validatorHandler(schema.update, 'body'),
  middleware.resourceExist,
  middleware.questionHasAnswer,
  controller.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.resourceId, 'params'),
  middleware.resourceExist,
  controller.remove
);

module.exports = router;
