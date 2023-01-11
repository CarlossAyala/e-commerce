const { Role } = require('../../database/mysql/models');

class RoleService {
  async create({ name, description }) {
    return await Role.model.create({
      name,
      description,
    });
  }

  async getOne(id) {
    return await Role.model.findByPk(id);
  }

  async getAll() {
    return await Role.model.findAll();
  }

  async remove(id) {
    return Role.model.destroy({
      where: {
        id,
      },
    });
  }

  async update(id, { name, description }) {
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
}

module.exports = RoleService;
