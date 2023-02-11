const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const cardSchema = require('./card.schema');
const cardMiddleware = require('./card.middleware');
const cardController = require('./card.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, cardController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.resourceId, 'params'),
  cardMiddleware.resourceExist,
  cardController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.create, 'body'),
  cardController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.resourceId, 'params'),
  validatorHandler(cardSchema.update, 'body'),
  cardMiddleware.resourceExist,
  cardController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.resourceId, 'params'),
  cardMiddleware.resourceExist,
  cardController.remove
);

module.exports = router;
