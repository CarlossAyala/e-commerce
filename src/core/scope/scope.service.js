const { Scope } = require('../../database/mysql/models');

class ScopeService {
  async create({ name }) {
    return Scope.model.create({
      name,
    });
  }

  async getOne(id) {
    return await Scope.model.findByPk(id);
  }

  async findByName({ scopeName: name }) {
    return await Scope.model.findOne({
      where: {
        name,
      },
    });
  }

  async getAll() {
    return await Scope.model.findAll();
  }

  async update(id, { name }) {
    return await Scope.model.update(
      { name },
      {
        where: {
          id,
        },
      }
    );
  }

  async remove(id) {
    return await Scope.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ScopeService;
