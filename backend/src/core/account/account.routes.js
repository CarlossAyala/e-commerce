const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const accountSchemas = require('./account.schema');
const accountMiddleware = require('./account.middleware');
const accountController = require('./account.controller');

router.post(
  '/signin',
  validatorHandler(accountSchemas.signinSchema, 'body'),
  accountController.signin
);

router.post(
  '/signup',
  validatorHandler(accountSchemas.signupSchema, 'body'),
  accountMiddleware.accountExist,
  accountController.signup
);

router.get('/profile', apiMiddleware.validateJWT, accountController.profile);

// TODO: Add these routes
// router.get('/refresh', validateJWT, refreshToken);
// router.get('/auth', (req, res, next) => {
//   console.log('/auth');
// });

module.exports = router;
