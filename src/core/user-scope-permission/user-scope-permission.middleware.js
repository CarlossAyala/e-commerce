const Boom = require('@hapi/boom');
const UserScopePermissionService = require('./user-scope-permission.service');

const UserScopePermissionProvider = new UserScopePermissionService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await UserScopePermissionProvider.getOne(resourceId);

    if (!resource)
      return next(Boom.notFound('User-Scope-Permission not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
