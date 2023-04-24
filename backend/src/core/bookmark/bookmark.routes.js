const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./bookmark.schema');
const middleware = require('./bookmark.middleware');
const controller = require('./bookmark.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, controller.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  middleware.existProduct,
  controller.getOne
);

// Create
router.post(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  middleware.existProduct,
  controller.create
);

// Delete All
router.delete('/clear', apiMiddleware.validateJWT, controller.removeAll);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.uuidV4, 'params'),
  middleware.resourceExist,
  controller.remove
);

module.exports = router;
