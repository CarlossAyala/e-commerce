const router = require('express').Router();

// const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./category.schema');
const middleware = require('./category.middleware');
const controller = require('./category.controller');

// Get All
router.get('/', controller.getAll);

// Get Category by slug
router.get(
  '/c/:cat',
  validatorHandler(schema.categorySlug, 'params'),
  middleware.existCatBySlug,
  controller.getCatBySlug
);

// Best Categories
router.get('/best-categories', controller.getBestCategories);

// Best Sub Categories
router.get(
  '/best-sub-categories/:cat',
  validatorHandler(schema.categorySlug, 'params'),
  middleware.existCatBySlug,
  controller.getBestSubCategories
);

// Best Sellers
router.get(
  '/best-sellers/:cat',
  validatorHandler(schema.categorySlug, 'params'),
  middleware.existCatBySlug,
  controller.getBestSellers
);

// Best Brands by Category
router.get(
  '/best-brands/:cat',
  validatorHandler(schema.categorySlug, 'params'),
  middleware.existCatBySlug,
  controller.getBestBrands
);

router.get(
  '/stores/:cat',
  middleware.existCatBySlug,
  controller.getCategoryStores
);

router.get(
  '/products/:cat',
  middleware.existCatBySlug,
  controller.getCategoryProducts
);

module.exports = router;

// // Create
// router.post(
//   '/',
//   apiMiddleware.validateJWT(),
//   validatorHandler(schema.create, 'body'),
//   middleware.parentCategoryExist,
//   controller.create
// );

// // Update
// router.put(
//   '/:id',
//   apiMiddleware.validateJWT(),
//   validatorHandler(schema.categoryId, 'params'),
//   validatorHandler(schema.update, 'body'),
//   middleware.categoryExist,
//   middleware.parentCategoryExist,
//   controller.update
// );

// // Delete
// router.delete(
//   '/:id',
//   apiMiddleware.validateJWT(),
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
