const router = require('express').Router();

// const apiMiddleware = require('../../middlewares/api');
// const validatorHandler = require('../../middlewares/api/validator.middleware');
// const schema = require('./business.schema');
const middleware = require('./business.middleware');
const controller = require('./business.controller');

// // Get All
// router.get('/', apiMiddleware.validateJWT, controller.getAll);

// // Get One
// router.get(
//   '/:id',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.resourceId, 'params'),
//   middleware.resourceExist,
//   controller.getOne
// );

// // Create
// router.post(
//   '/',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.create, 'body'),
//   controller.create
// );

// // Update
// router.patch(
//   '/:id',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.resourceId, 'params'),
//   validatorHandler(schema.update, 'body'),
//   middleware.resourceExist,
//   controller.update
// );

// // Delete
// router.delete(
//   '/:id',
//   apiMiddleware.validateJWT,
//   validatorHandler(schema.resourceId, 'params'),
//   middleware.resourceExist,
//   controller.remove
// );

// Get Brand by Product Id
router.get('/id/:id', controller.getInfoBrand);

// Get official stores
router.get('/official-stores', controller.getOfficialStores);

// Best Brands by All Time
router.get('/best-brands', controller.getBestBrands);

// Get Store by Slug
router.get(
  '/slug/:slug',
  middleware.existBusinessBySlug,
  controller.getBusinessBySlug
);

router.get(
  '/categories/:slug',
  middleware.existBusinessBySlug,
  controller.getCategoriesStore
);

router.get(
  '/products/:slug',
  middleware.existBusinessBySlug,
  controller.getProductsStore
);

module.exports = router;
