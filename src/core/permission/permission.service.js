const { Permission } = require('../../database/mysql/models');

class PermissionService {
  create({ name, description }) {
    return Permission.model.create({
      name,
      description,
    });
  }

  getOne(id) {
    return Permission.model.findByPk(id);
  }

  getAll() {
    return Permission.model.findAll();
  }

  update(id, { name, description }) {
    return Permission.model.update(
      { name, description },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Permission.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = PermissionService;
