const Boom = require('@hapi/boom');
const BookmarkService = require('./bookmark.service');

const BookmarkProvider = new BookmarkService();

const resourceExist = async (req, res, next) => {
  const productId = req.params.id;
  const customerId = req.auth.id;

  try {
    const resource = await BookmarkProvider.getOne(customerId, productId);

    if (!resource) return next(Boom.notFound('Bookmark not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const existProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const resource = await BookmarkProvider.existProduct(productId);

    if (!resource) return next(Boom.notFound('Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  existProduct,
};
