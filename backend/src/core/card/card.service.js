const { Card } = require('../../database/mysql/models');

class CardService {
  create({ brand, number, holder, expiration, cvv, fkUser }) {
    return Card.model.create({
      brand,
      number,
      holder,
      expiration,
      cvv,
      fkUser,
    });
  }

  getOne(id) {
    return Card.model.findByPk(id);
  }

  getAll(id) {
    return Card.model.findAll({
      where: {
        fkUser: id,
      },
      attributes: {
        exclude: ['fkUser'],
      },
    });
  }

  update(id, { brand, number, holder, expiration, cvv }) {
    return Card.model.update(
      { brand, number, holder, expiration, cvv },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Card.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = CardService;
