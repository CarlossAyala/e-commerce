const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./account.schema');
const middleware = require('./account.middleware');
const controller = require('./account.controller');

router.post(
  '/signin',
  validatorHandler(schema.signin, 'body'),
  controller.signin
);

router.post(
  '/signup',
  validatorHandler(schema.signup, 'body'),
  middleware.accountExist,
  controller.signup
);

router.get(
  '/profile',
  apiMiddleware.validateJWT,
  middleware.userExist,
  controller.profile
);

router.patch(
  '/change-name',
  apiMiddleware.validateJWT,
  validatorHandler(schema.changeName, 'body'),
  middleware.userExist,
  controller.changeName
);

router.patch(
  '/change-password',
  apiMiddleware.validateJWT,
  validatorHandler(schema.changePassword, 'body'),
  middleware.userExist,
  controller.changePassword
);

module.exports = router;
