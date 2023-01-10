const { Role } = require('../../database/mysql/models');

class RoleService {
  static async create({ name, description }) {
    return await Role.model.create({
      name,
      description,
    });
  }

  static async getOne(id) {
    return await Role.model.findByPk(id);
  }

  static async getAll() {
    return await Role.model.findAll();
  }

  static async remove(id) {
    return Role.model.destroy({
      where: {
        id,
      },
    });
  }

  static async update(id, { name, description }) {
    return Role.model.update(
      {
        name,
        description,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  static async getXRole(userId, role) {
    return;
  }
}

module.exports = RoleService;
