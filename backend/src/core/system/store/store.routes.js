const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Store } = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./store.schema');

// Get
router.get(
  '/:id',
  validatorSchema(schemas.resourceId, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const store = await Store.model.findByPk(id, {
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
      });
      if (!store) {
        return next(Boom.notFound('Store not found'));
      }

      return res.status(200).json(store);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
