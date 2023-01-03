const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const cardSchema = require('./card.schema');
const cardMiddleware = require('./card.middleware');
const cardController = require('./card.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, cardController.getAll);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.create, 'body'),
  cardController.create
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(cardSchema.cardId, 'params'),
  cardMiddleware.cardExist,
  cardController.remove
);

module.exports = router;
