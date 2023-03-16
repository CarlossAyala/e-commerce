const { Card } = require('../../database/mysql/models');

class CardService {
  create(body) {
    return Card.model.create(body);
  }

  getOne(id) {
    return Card.model.findByPk(id, {
      attributes: {
        exclude: ['userId'],
      },
    });
  }

  getAll(id) {
    return Card.model.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: ['userId'],
      },
    });
  }

  update(id, body) {
    return Card.model.update(body, {
      where: {
        id,
      },
    });
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
