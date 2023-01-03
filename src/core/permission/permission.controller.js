const ScopeService = require('../scope/scope.service');
const UserService = require('../user/user.service');
const PermissionService = require('./permission.service');

const ScopeProvider = new ScopeService();
const PermissionProvider = new PermissionService();
const UserProvider = new UserService();

const create = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await UserProvider.getOne(userId);
    const scope = await ScopeProvider.findByName(req.body);

    await PermissionProvider.create({
      fk_user: user.dataValues.id,
      fk_scope: scope.dataValues.id,
    });

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const scope = await PermissionProvider.getOne(req.params.id);

    res.status(200).json(scope);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const scopes = await PermissionProvider.getAll();

    res.status(200).json(scopes);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await PermissionProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  remove,
};
