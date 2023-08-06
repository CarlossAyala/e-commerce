const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const { Category } = require('../../../database/mysql/models');
const JWT = require('../../../middlewares/auth/jwt.auth');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const schemas = require('./category.schema');
const { Op } = require('sequelize');

// Get Main Categories
router.get('/main', async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
        available: true,
      },
    });

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
