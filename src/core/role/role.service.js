const { Role } = require('../../database/mysql/models');

class RoleService {
  create({ name, description, madeFor }) {
    return Role.model.create({
      name,
      description,
      madeFor,
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

  update(id, { name, description, madeFor }) {
    return Role.model.update(
      {
        name,
        description,
        madeFor,
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
