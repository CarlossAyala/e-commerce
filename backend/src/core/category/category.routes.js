const router = require('express').Router();

// const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./category.schema');
const middleware = require('./category.middleware');
const controller = require('./category.controller');

// Get All
router.get('/', controller.getAll);

// Best Categories
router.get('/best-categories', controller.getBestCategories);

// Get Info Category by Slug
router.get(
  '/info/:cat',
  validatorHandler(schema.catBySlug, 'params'),
  middleware.existParentCatBySlug,
  controller.getInfoParentCat
);

// Get Info Sub Category
router.get(
  '/info/:cat/:subCat',
  validatorHandler(schema.subCatBySlug, 'params'),
  middleware.existParentCatBySlug,
  middleware.existChildrenCatBySlug,
  controller.getInfoChildrenCat
);

// Best Sub Categories
router.get(
  '/:cat/best-sub-categories',
  validatorHandler(schema.catBySlug, 'params'),
  middleware.existParentCatBySlug,
  controller.getBestSubCategories
);

// Best Sellers
router.get(
  '/:cat/best-sellers',
  validatorHandler(schema.catBySlug, 'params'),
  middleware.existCatBySlug,
  controller.getBestSellers
);

// Best Brands by Category
router.get(
  '/:cat/best-brands',
  validatorHandler(schema.catBySlug, 'params'),
  middleware.existCatBySlug,
  controller.getBestBrands
);

// MIDDLEWARE
// existCatBySlug
// existParentCatBySlug
// existChildrenCatBySlug

// CONTROLLERS
// getCatById
// getSubCatById
// getCatBySlug
// getSubCatBySlug
// getBestBrands
// getBestSellers
// getBestSubCategories

module.exports = router;

// // Create
// router.post(
//   '/',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.create, 'body'),
//   middleware.parentCategoryExist,
//   controller.create
// );

// // Update
// router.put(
//   '/:id',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.categoryId, 'params'),
//   validatorHandler(schema.update, 'body'),
//   middleware.categoryExist,
//   middleware.parentCategoryExist,
//   controller.update
// );

// // Delete
// router.delete(
//   '/:id',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.categoryId, 'params'),
//   middleware.categoryExist,
//   controller.remove
// );

// // Get One by ID
// router.get(
//   '/:id',
//   validatorHandler(schema.categoryId, 'params'),
//   middleware.categoryExist,
//   controller.getOne
// );
