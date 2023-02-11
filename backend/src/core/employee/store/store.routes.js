const router = require('express').Router();

const apiMiddleware = require('../../../middlewares/api');
const validatorHandler = require('../../../middlewares/api/validator.middleware');
const storeSchema = require('./store.schema');
const storeMiddleware = require('./store.middleware');
const storeController = require('./store.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, storeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  storeMiddleware.resourceExist,
  storeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.create, 'body'),
  storeController.create
);

// Update Name
router.patch(
  '/fullname/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  validatorHandler(storeSchema.updateName, 'body'),
  storeMiddleware.resourceExist,
  storeController.updateName
);

// Update email
router.patch(
  '/email/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  validatorHandler(storeSchema.updateEmail, 'body'),
  storeMiddleware.resourceExist,
  storeController.updateEmail
);

// Update password
router.patch(
  '/change-password/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  validatorHandler(storeSchema.updatePassword, 'body'),
  storeMiddleware.resourceExist,
  storeController.updatePassword
);

// Update hireDate
router.patch(
  '/hire-date/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  validatorHandler(storeSchema.updateHireDate, 'body'),
  storeMiddleware.resourceExist,
  storeController.updateHireDate
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(storeSchema.resourceId, 'params'),
  storeMiddleware.resourceExist,
  storeController.remove
);

module.exports = router;
