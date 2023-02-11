const router = require('express').Router();

const apiMiddleware = require('../../middlewares/api');
const validatorHandler = require('../../middlewares/api/validator.middleware');
const schema = require('./employee-role.schema');
const middleware = require('./employee-role.middleware');
const controller = require('./employee-role.controller');

// Create
router.post(
  '/',
  apiMiddleware.validateJWT,
  validatorHandler(schema.create, 'body'),
  middleware.employeeExist,
  middleware.roleExist,
  controller.create
);

// Update
router.patch(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.resourceId, 'params'),
  validatorHandler(schema.update, 'body'),
  middleware.resourceExist,
  middleware.roleExist,
  controller.update
);

// Delete
router.delete(
  '/:id',
  apiMiddleware.validateJWT,
  validatorHandler(schema.resourceId, 'params'),
  middleware.resourceExist,
  controller.remove
);

module.exports = router;
