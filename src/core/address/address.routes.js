const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const addressSchema = require('./address.schema');
const addressMiddleware = require('./address.middleware');
const addressController = require('./address.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, addressController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(addressSchema.addressId, 'params'),
  addressMiddleware.addressExist,
  addressController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(addressSchema.create, 'body'),
  addressController.create
);

// Update
router.put(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(addressSchema.addressId, 'params'),
  validatorHandler(addressSchema.update, 'body'),
  addressMiddleware.addressExist,
  addressController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(addressSchema.addressId, 'params'),
  addressMiddleware.addressExist,
  addressController.remove
);

module.exports = router;
