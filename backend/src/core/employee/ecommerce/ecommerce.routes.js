const router = require('express').Router();

const apiMiddleware = require('../../../middlewares/api');
const validatorHandler = require('../../../middlewares/api/validator.middleware');
const ecommerceSchema = require('./ecommerce.schema');
const ecommerceMiddleware = require('./ecommerce.middleware');
const ecommerceController = require('./ecommerce.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, ecommerceController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.create, 'body'),
  ecommerceController.create
);

// Update Name
router.patch(
  '/fullname/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  validatorHandler(ecommerceSchema.updateName, 'body'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.updateName
);

// Update email
router.patch(
  '/email/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  validatorHandler(ecommerceSchema.updateEmail, 'body'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.updateEmail
);

// Update password
router.patch(
  '/change-password/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  validatorHandler(ecommerceSchema.updatePassword, 'body'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.updatePassword
);

// Update hireDate
router.patch(
  '/hire-date/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  validatorHandler(ecommerceSchema.updateHireDate, 'body'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.updateHireDate
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(ecommerceSchema.resourceId, 'params'),
  ecommerceMiddleware.resourceExist,
  ecommerceController.remove
);

module.exports = router;
