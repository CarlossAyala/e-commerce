const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const employeeSchema = require('./employee.schema');
const employeeMiddleware = require('./employee.middleware');
const employeeController = require('./employee.controller');

// Get All
router.get('/', apiMiddleware.validateJWT, employeeController.getAll);

// Get One
router.get(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(employeeSchema.resourceId, 'params'),
  employeeMiddleware.resourceExist,
  employeeController.getOne
);

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(employeeSchema.create, 'body'),
  employeeController.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(employeeSchema.resourceId, 'params'),
  validatorHandler(employeeSchema.update, 'body'),
  employeeMiddleware.resourceExist,
  employeeController.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(employeeSchema.resourceId, 'params'),
  employeeMiddleware.resourceExist,
  employeeController.remove
);

module.exports = router;
