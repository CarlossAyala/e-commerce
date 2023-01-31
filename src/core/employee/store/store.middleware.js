const Boom = require('@hapi/boom');
const StoreService = require('./store.service');

const StoreProvider = new StoreService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await StoreProvider.getOne(resourceId);

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
