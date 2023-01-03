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

// UPDATES
router.put(
  '/:id/fullname',
  apiMiddleware.validateJWT,
  validatorHandler(userSchema.userId, 'params'),
  validatorHandler(userSchema.updateFullname, 'body'),
  userMiddleware.userExist,
  userController.updateFullname
);

router.patch(
  '/:id/email',
  apiMiddleware.validateJWT,
  validatorHandler(userSchema.userId, 'params'),
  validatorHandler(userSchema.updateEmail, 'body'),
  userMiddleware.userExist,
  userController.updateEmail
);

router.patch(
  '/:id/change-password',
  apiMiddleware.validateJWT,
  validatorHandler(userSchema.userId, 'params'),
  validatorHandler(userSchema.changePassword, 'body'),
  userMiddleware.userExist,
  userController.changePassword
);

module.exports = router;
