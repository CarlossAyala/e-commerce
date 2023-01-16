const Boom = require('@hapi/boom');
const ChargeService = require('./charge.service');

const ChargeProvider = new ChargeService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await ChargeProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Charge Category not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
