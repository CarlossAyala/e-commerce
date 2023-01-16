const Boom = require('@hapi/boom');
const ChargeCategoryService = require('./charge-category.service');

const ChargeCategoryProvider = new ChargeCategoryService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await ChargeCategoryProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Charge not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
