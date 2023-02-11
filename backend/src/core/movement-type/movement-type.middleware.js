const Boom = require('@hapi/boom');
const MovementTypeService = require('./movement-type.service');

const MovementTypeProvider = new MovementTypeService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await MovementTypeProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Movement Type not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
