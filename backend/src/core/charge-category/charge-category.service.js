const { ChargeCategory } = require('../../database/mysql/models');

class ChargeCategoryService {
  create({ name, description }) {
    return ChargeCategory.model.create({
      name,
      description,
    });
  }

  getOne(id) {
    return ChargeCategory.model.findByPk(id);
  }

  getAll() {
    return ChargeCategory.model.findAll();
  }

  update(id, { name, description }) {
    return ChargeCategory.model.update(
      { name, description },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return ChargeCategory.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ChargeCategoryService;
