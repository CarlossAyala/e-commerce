const UserRoleService = require('./user-role.service');

const UserRoleProvider = new UserRoleService();

const getOne = async (req, res, next) => {
  try {
    const userRole = await UserRoleProvider.getOne(req.params.id);

    res.status(200).json(userRole);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const usersRoles = await UserRoleProvider.getAll();

    res.status(200).json(usersRoles);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    await UserRoleProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await UserRoleProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await UserRoleProvider.update(req.params.id, req.body);

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
