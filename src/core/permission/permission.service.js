const { Permission } = require('../../database/mysql/models');

class PermissionService {
  async create({ fk_user, fk_scope }) {
    return await Permission.model.create({
      fk_user,
      fk_scope,
    });
  }

  async getOne(id) {
    return await Permission.model.findByPk(id);
  }

  async getAll() {
    return await Permission.model.findAll();
  }

  async remove(id) {
    return await Permission.model.destroy({
      where: {
        id,
      },
    });
  }

  async alreadyHasPermission({ fk_user, fk_scope }) {
    return await Permission.model.findOne({
      where: {
        fk_user,
        fk_scope,
      },
    });
  }
}

module.exports = PermissionService;
