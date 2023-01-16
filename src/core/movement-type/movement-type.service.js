const { MovementType } = require('../../database/mysql/models');

class MovementTypeService {
  create({ name, description }) {
    return MovementType.model.create({
      name,
      description,
    });
  }

  getOne(id) {
    return MovementType.model.findByPk(id);
  }

  getAll() {
    return MovementType.model.findAll();
  }

  update(id, { name, description }) {
    return MovementType.model.update(
      { name, description },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return MovementType.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MovementTypeService;
