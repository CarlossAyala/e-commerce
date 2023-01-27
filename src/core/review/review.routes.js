const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const reviewSchema = require('./review.schema');
const reviewMiddleware = require('./review.middleware');
const reviewController = require('./review.controller');

// Get All
router.get(
  '/product/:id',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  reviewMiddleware.productExist,
  reviewController.getAll
);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  reviewMiddleware.resourceExist,
  reviewController.getOne
);

// Create
router.post(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  validatorHandler(reviewSchema.create, 'body'),
  reviewMiddleware.productExist,
  reviewController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  validatorHandler(reviewSchema.update, 'body'),
  reviewMiddleware.resourceExist,
  reviewController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  reviewMiddleware.resourceExist,
  reviewController.remove
);

// Like
router.patch(
  '/:id/like',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  reviewMiddleware.resourceExist,
  reviewController.like
);

// Dislike
router.patch(
  '/:id/dislike',
  apiMiddleware.validateJWT,
  validatorHandler(reviewSchema.resourceId, 'params'),
  reviewMiddleware.resourceExist,
  reviewController.dislike
);

module.exports = router;
