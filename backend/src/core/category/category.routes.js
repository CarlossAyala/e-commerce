const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const categorySchema = require('./category.schema');
const categoryMiddleware = require('./category.middleware');
const categoryController = require('./category.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, categoryController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(categorySchema.categoryId, 'params'),
  categoryMiddleware.categoryExist,
  categoryController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(categorySchema.create, 'body'),
  categoryMiddleware.parentCategoryExist,
  categoryController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(categorySchema.categoryId, 'params'),
  validatorHandler(categorySchema.update, 'body'),
  categoryMiddleware.categoryExist,
  categoryController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(categorySchema.categoryId, 'params'),
  categoryMiddleware.categoryExist,
  categoryController.remove
);

module.exports = router;
