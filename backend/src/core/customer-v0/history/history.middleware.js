const Boom = require('@hapi/boom');
const HistoryService = require('./history.service');

const HistoryProvider = new HistoryService();

const resourceExist = async (req, res, next) => {
  const customerId = req.auth.id;
  const productId = req.params.id;

  try {
    const resource = await HistoryProvider.getOne(customerId, productId);

    if (!resource) return next(Boom.notFound('History Product not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const existProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const resource = await HistoryProvider.existProduct(productId);

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
