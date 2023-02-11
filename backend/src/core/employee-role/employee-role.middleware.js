const Boom = require('@hapi/boom');
const EmployeeRoleService = require('./employee-role.service');

const EmployeeRoleProvider = new EmployeeRoleService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await EmployeeRoleProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Employee-Role not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const employeeExist = async (req, res, next) => {
  try {
    const { employeeId } = req.body;
    const resource = await EmployeeRoleProvider.getEmployee(employeeId);

    if (!resource) return next(Boom.notFound('Employee not found'));

    next();
  } catch (error) {
    next(error);
  }
};

const roleExist = async (req, res, next) => {
  try {
    const { roleId } = req.body;
    const resource = await EmployeeRoleProvider.getRole(roleId);

    if (!resource) return next(Boom.notFound('Role not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
  employeeExist,
  roleExist,
};
