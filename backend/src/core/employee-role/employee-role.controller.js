const EmployeeRoleService = require('./employee-role.service');

const EmployeeRoleProvider = new EmployeeRoleService();

const create = async (req, res, next) => {
  try {
    await EmployeeRoleProvider.create(req.body);

    res.status(201).json({
      message: 'Created successfully',
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await EmployeeRoleProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    await EmployeeRoleProvider.update(req.params.id, req.body);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  update,
  remove,
};
