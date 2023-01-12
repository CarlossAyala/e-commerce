const { UserScope } = require('../../database/mysql/models');

class UserScopeService {
  create({ fkUser, fkScope }) {
    return UserScope.model.create({
      fkUser,
      fkScope,
    });
  }

  getOne(id) {
    return UserScope.model.findByPk(id);
  }

  getAll() {
    return UserScope.model.findAll();
  }

  update(id, { fkScope }) {
    return UserScope.model.update(
      { fkScope },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return UserScope.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = UserScopeService;
