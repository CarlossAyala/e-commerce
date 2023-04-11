const Boom = require('@hapi/boom');
const BusinessService = require('./business.service');

const BusinessProvider = new BusinessService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await BusinessProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Business not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const existBusinessBySlug = async (req, res, next) => {
  try {
    const business = await BusinessProvider.existBusinessBySlug(
      req.params.slug
    );

    if (!business) return next(Boom.notFound('Business not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  existBusinessBySlug,
};
