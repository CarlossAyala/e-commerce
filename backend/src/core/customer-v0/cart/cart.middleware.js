const Boom = require('@hapi/boom');
const CartItemService = require('./cart.service');
const ProductService = require('../product/product.service');

const CartItemProvider = new CartItemService();
const ProductProvider = new ProductService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await CartItemProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Cart Item not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const productExist = async (req, res, next) => {
  try {
    const product = await ProductProvider.getOne(req.params.id);

    if (!product) return next(Boom.notFound('Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  productExist,
};
