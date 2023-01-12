const Boom = require('@hapi/boom');
const UserScopeService = require('./user-scope.service');

const UserScopeProvider = new UserScopeService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await UserScopeProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('User-Scope not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
