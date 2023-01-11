const PermissionService = require('./permission.service');

const PermissionProvider = new PermissionService();

const getOne = async (req, res, next) => {
  try {
    const permission = await PermissionProvider.getOne(req.params.id);

    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const permissions = await PermissionProvider.getAll();

    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await PermissionProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
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

const update = async (req, res, next) => {
  try {
    await PermissionProvider.update(req.params.id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
};
