const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const userSchema = require('./user.schema');
const userMiddleware = require('./user.middleware');
const userController = require('./user.controller');

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userSchema.userId, 'params'),
  userMiddleware.userExist,
  userController.getOne
);

// DELETE
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(userSchema.userId, 'params'),
  userMiddleware.userExist,
  userController.remove
);

module.exports = router;
