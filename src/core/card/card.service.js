const { Card } = require('../../database/mysql/models');

class CardService {
  async create({ brand, number, holder, expiration, cvv, fkUser }) {
    return await Card.model.create({
      brand,
      number,
      holder,
      expiration,
      cvv,
      fkUser,
    });
  }

  async getOne(id) {
    return await Card.model.findByPk(id);
  }

  async getAll(id) {
    return await Card.model.findAll({
      where: {
        fkUser: id,
      },
      attributes: {
        exclude: ['fkUser'],
      },
    });
  }

  async remove(id) {
    return Card.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CardService;
