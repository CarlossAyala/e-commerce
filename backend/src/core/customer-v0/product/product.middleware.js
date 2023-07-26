const Boom = require('@hapi/boom');
const ProductService = require('./product.service');

const ProductProvider = new ProductService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await ProductProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
