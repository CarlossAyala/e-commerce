const { Scope } = require('../../database/mysql/models');

class ScopeService {
  create({ name, description, madeFor }) {
    return Scope.model.create({
      name,
      description,
      madeFor,
    });
  }

  getOne(id) {
    return Scope.model.findByPk(id);
  }

  getAll() {
    return Scope.model.findAll();
  }

  update(id, { name, description, madeFor }) {
    return Scope.model.update(
      { name, description, madeFor },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Scope.model.destroy({
      where: {
        id,
      },
    });
  }

  findByName(name) {
    return Scope.model.findOne({
      where: {
        name,
      },
    });
  }
}

module.exports = ScopeService;
