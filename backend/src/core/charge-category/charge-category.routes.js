const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const chargeCategorySchema = require('./charge-category.schema');
const chargeCategoryMiddleware = require('./charge-category.middleware');
const chargeCategoryController = require('./charge-category.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, chargeCategoryController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeCategorySchema.resourceId, 'params'),
  chargeCategoryMiddleware.resourceExist,
  chargeCategoryController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(chargeCategorySchema.create, 'body'),
  chargeCategoryController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeCategorySchema.resourceId, 'params'),
  validatorHandler(chargeCategorySchema.update, 'body'),
  chargeCategoryMiddleware.resourceExist,
  chargeCategoryController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(chargeCategorySchema.resourceId, 'params'),
  chargeCategoryMiddleware.resourceExist,
  chargeCategoryController.remove
);

module.exports = router;
