const { CardRegister } = require('../../database/mysql/models');

class CardRegisterService {
  create({ brand, number }) {
    return CardRegister.model.create({
      brand,
      number,
    });
  }

  getOne(id) {
    return CardRegister.model.findByPk(id);
  }
}

module.exports = CardRegisterService;
