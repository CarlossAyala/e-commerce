const { Address } = require('../../database/mysql/models');

class AddressService {
  async create(data) {
    return await Address.model.create(data);
  }

  async getOne(id) {
    return await Address.model.findByPk(id, {
      attributes: {
        exclude: ['fkUser'],
      },
    });
  }

  async getAll(id) {
    return await Address.model.findAll({
      where: {
        fkUser: id,
      },
    });
  }

  async remove(id) {
    return Address.model.destroy({
      where: {
        id,
      },
    });
  }

  async update(id, body) {
    return Address.model.update(body, {
      where: {
        id,
      },
    });
  }
}

module.exports = AddressService;
