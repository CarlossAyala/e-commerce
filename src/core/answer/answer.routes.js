const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const answerSchema = require('./answer.schema');
const answerMiddleware = require('./answer.middleware');
const answerController = require('./answer.controller');

// Get All
router.get(
  '/product/:id',
  apiMiddleware.validateJWT,
  validatorHandler(answerSchema.resourceId, 'params'),
  answerMiddleware.productExist,
  answerController.getAll
);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(answerSchema.resourceId, 'params'),
  answerMiddleware.questionExist,
  answerController.getOne
);

// Answer
router.post(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(answerSchema.resourceId, 'params'),
  validatorHandler(answerSchema.create, 'body'),
  answerMiddleware.questionExist,
  answerMiddleware.answerExist,
  answerController.answer
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(answerSchema.resourceId, 'params'),
  validatorHandler(answerSchema.update, 'body'),
  answerMiddleware.questionExist,
  answerMiddleware.answerAlreadyExist,
  answerController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(answerSchema.resourceId, 'params'),
  answerMiddleware.answerAlreadyExist,
  answerController.remove
);

module.exports = router;
