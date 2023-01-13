const { UserScopePermission } = require('../../database/mysql/models');

class UserScopePermissionService {
  create({ fkUserScope, fkPermission }) {
    return UserScopePermission.model.create({
      fkUserScope,
      fkPermission,
    });
  }

  getOne(id) {
    return UserScopePermission.model.findByPk(id);
  }

  getAll() {
    return UserScopePermission.model.findAll();
  }

  update(id, { fkPermission }) {
    return UserScopePermission.model.update(
      { fkPermission },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return UserScopePermission.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = UserScopePermissionService;
