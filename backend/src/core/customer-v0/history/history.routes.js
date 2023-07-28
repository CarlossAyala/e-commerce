const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./history.schema');
const middleware = require('./history.middleware');
const controller = require('./history.controller');

// Get All
router.get('/', apiMiddleware.validateJWT(), controller.getAll);

// Create
router.post(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.existProduct,
  controller.create
);

// Clear history
router.delete('/clear', apiMiddleware.validateJWT(), controller.removeAll);

// Delete one
router.delete(
  '/:id',
  apiMiddleware.validateJWT(),
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.remove
);

module.exports = router;
