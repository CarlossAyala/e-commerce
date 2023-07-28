const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./address.schema');
const middleware = require('./address.middleware');
const controller = require('./address.controller');

// Get All
router.get('/', apiMiddleware.validateJWT(), controller.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.addressExist,
  controller.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.base, 'body'),
  controller.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  validatorHandler(schema.base, 'body'),
  middleware.addressExist,
  controller.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.addressExist,
  controller.remove
);

module.exports = router;
