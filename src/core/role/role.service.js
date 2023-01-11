const { Role } = require('../../database/mysql/models');

class RoleService {
  create({ name, description }) {
    return Role.model.create({
      name,
      description,
    });
  }

  getOne(id) {
    return Role.model.findByPk(id);
  }

  getAll() {
    return Role.model.findAll();
  }

  remove(id) {
    return Role.model.destroy({
      where: {
        id,
      },
    });
  }

  update(id, { name, description }) {
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
