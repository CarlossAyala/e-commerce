const Boom = require('@hapi/boom');
const { Product } = require('../../database/mysql/models');
const ReviewService = require('./review.service');

const ReviewProvider = new ReviewService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await ReviewProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Review not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const productExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await Product.model.findByPk(resourceId);

    if (!resource) return next(Boom.notFound('Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  productExist,
};
