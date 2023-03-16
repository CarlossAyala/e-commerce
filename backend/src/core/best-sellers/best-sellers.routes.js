const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./best-sellers.schema');
const middleware = require('./best-sellers.middleware');
const controller = require('./best-sellers.controller');

router.get('/', controller.getBestSellers);

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

module.exports = router;
