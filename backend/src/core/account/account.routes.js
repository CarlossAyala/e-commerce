const router = require('express').Router();

const validatorHandler = require('../../middlewares/api/validator.middleware');
const accountSchemas = require('./account.schema');
const accountMiddleware = require('./account.middleware');
const accountController = require('./account.controller');

router.post(
  '/login',
  validatorHandler(accountSchemas.loginSchema, 'body'),
  accountController.login
);

router.post(
  '/signup',
  validatorHandler(accountSchemas.signupSchema, 'body'),
  accountMiddleware.accountExist,
  accountController.signup
);

// TODO: Add these routes
// router.get('/refresh', validateJWT, refreshToken);
// router.get('/auth', (req, res, next) => {
//   console.log('/auth');
// });

module.exports = router;
