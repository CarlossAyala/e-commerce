const Boom = require('@hapi/boom');
const EcommerceService = require('./ecommerce.service');

const EcommerceProvider = new EcommerceService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await EcommerceProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Employee not found'));

    next();
  } catch (error) {
    next(error);
  }
};

// TODO: Check roles of user logged in

module.exports = {
  resourceExist,
};
