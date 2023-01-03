const Boom = require('@hapi/boom');
const UserService = require('../user/user.service');
const ScopeService = require('../scope/scope.service');
const PermissionService = require('./permission.service');

const UserProvider = new UserService();
const ScopeProvider = new ScopeService();
const PermissionProvider = new PermissionService();

const userExist = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await UserProvider.getOne(userId);

    if (!user) return next(Boom.badRequest('User not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const userAuthorization = async (req, res, next) => {
  try {
    const user = await UserProvider.getOne(req.auth.id);

    const hasAdminPermission = (scope) => scope.name === 'ADMIN';

    const hasAuthorization = user.dataValues.scopes.some(hasAdminPermission);

    if (!hasAuthorization)
      return next(Boom.unauthorized("Your don't have permissions for this"));

    next();
  } catch (error) {
    next(error);
  }
};

const scopeExist = async (req, res, next) => {
  try {
    const scope = await ScopeProvider.findByName(req.body);
    if (!scope) return next(Boom.badRequest('Scope not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const alreadyHasPermission = async (req, res, next) => {
  try {
    const user = await UserProvider.getOne(req.body.userId);
    const scope = await ScopeProvider.findByName(req.body);

    const hasPermission = await PermissionProvider.alreadyHasPermission({
      fk_user: user.dataValues.id,
      fk_scope: scope.dataValues.id,
    });
    // console.log('hasPermission', hasPermission);

    if (hasPermission)
      return next(Boom.badRequest('Already has this permission'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userExist,
  userAuthorization,
  scopeExist,
  alreadyHasPermission,
};
