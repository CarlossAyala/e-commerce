const RoleService = require('./role.service');

const RoleProvider = new RoleService();

const getOne = async (req, res, next) => {
  try {
    const role = await RoleProvider.getOne(req.params.id);

    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const roles = await RoleProvider.getAll();

    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await RoleProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await RoleProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await RoleProvider.update(req.params.id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
  create,
  remove,
  update,
};
