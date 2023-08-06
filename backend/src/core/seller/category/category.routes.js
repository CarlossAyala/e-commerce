const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const QueryBuilder = require('../../../utils/database/query-builder');
const { Category } = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./category.schema');

// Search
router.get('/search', async (req, res, next) => {
  const qb = new QueryBuilder(req.query)
    .whereLike('name', req.query.name)
    .orderBy('name', 'ASC')
    .withPagination()
    .build();

  try {
    const categories = await Category.model.findAndCountAll(qb);

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
