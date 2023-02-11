const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const questionSchema = require('./question.schema');
const questionMiddleware = require('./question.middleware');
const questionController = require('./question.controller');

// Get All
router.get(
  '/product/:id',
  apiMiddleware.validateJWT,
  validatorHandler(questionSchema.resourceId, 'params'),
  questionMiddleware.productExist,
  questionController.getAll
);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(questionSchema.resourceId, 'params'),
  questionMiddleware.resourceExist,
  questionController.getOne
);

// Create
router.post(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(questionSchema.resourceId, 'params'),
  validatorHandler(questionSchema.create, 'body'),
  questionMiddleware.productExist,
  questionController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(questionSchema.resourceId, 'params'),
  validatorHandler(questionSchema.update, 'body'),
  questionMiddleware.resourceExist,
  questionMiddleware.questionHasAnswer,
  questionController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(questionSchema.resourceId, 'params'),
  questionMiddleware.resourceExist,
  questionController.remove
);

module.exports = router;
