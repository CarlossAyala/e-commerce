const { UserRole } = require('../../database/mysql/models');

class UserRoleService {
  create({ fkUser, fkRole }) {
    return UserRole.model.create({
      fkUser,
      fkRole,
    });
  }

  getOne(id) {
    return UserRole.model.findByPk(id);
  }

  getAll() {
    return UserRole.model.findAll();
  }

  update(id, { fkRole }) {
    return UserRole.model.update(
      { fkRole },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return UserRole.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = UserRoleService;
