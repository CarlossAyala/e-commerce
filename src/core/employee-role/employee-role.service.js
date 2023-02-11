const { EmployeeRole, Employee, Role } = require('../../database/mysql/models');

class EmployeeRoleService {
  getOne(id) {
    return EmployeeRole.model.findByPk(id);
  }

  create({ employeeId, roleId }) {
    return EmployeeRole.model.create({
      employeeId,
      roleId,
    });
  }

  update(id, { roleId }) {
    return EmployeeRole.model.update(
      { roleId },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return EmployeeRole.model.destroy({
      where: {
        id,
      },
    });
  }

  getEmployee(id) {
    return Employee.model.findByPk(id);
  }

  getRole(id) {
    return Role.model.findByPk(id);
  }
}

module.exports = EmployeeRoleService;
