const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const productSchema = require('./product.schema');
const productMiddleware = require('./product.middleware');
const productController = require('./product.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, productController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(productSchema.resourceId, 'params'),
  productMiddleware.resourceExist,
  productController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(productSchema.create, 'body'),
  productController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(productSchema.resourceId, 'params'),
  validatorHandler(productSchema.update, 'body'),
  productMiddleware.resourceExist,
  productController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(productSchema.resourceId, 'params'),
  productMiddleware.resourceExist,
  productController.remove
);

module.exports = router;
