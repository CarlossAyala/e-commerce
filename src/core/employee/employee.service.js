const { Employee } = require('../../database/mysql/models');

class EmployeeService {
  create({ userId, businessId, scopeId }) {
    return Employee.model.create({
      userId,
      businessId,
      scopeId,
    });
  }

  getOne(id) {
    return Employee.model.findByPk(id);
  }

  getAll() {
    return Employee.model.findAll();
  }

  update(id, { scopeId }) {
    return Employee.model.update(
      { scopeId },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Employee.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = EmployeeService;
