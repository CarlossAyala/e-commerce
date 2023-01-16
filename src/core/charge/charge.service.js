const { Charge } = require('../../database/mysql/models');

class ChargeService {
  create({ name, description, type, rate, amount, active, fkChargeCategory }) {
    return Charge.model.create({
      name,
      description,
      type,
      rate,
      amount,
      active,
      fkChargeCategory,
    });
  }

  getOne(id) {
    return Charge.model.findByPk(id);
  }

  getAll() {
    return Charge.model.findAll();
  }

  update(id, body) {
    const { name, description, type, rate, amount, active, fkChargeCategory } =
      body;

    return Charge.model.update(
      { name, description, type, rate, amount, active, fkChargeCategory },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Charge.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ChargeService;
