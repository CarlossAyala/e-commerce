const { Address } = require('../../database/mysql/models');

class AddressService {
  async create({
    contactName,
    contactPhone,
    zipCode,
    province,
    city,
    street,
    streetNumber,
    apartmentNumber,
    streetOne,
    streetTwo,
    aditional,
    fkUser,
  }) {
    return await Address.model.create({
      contactName,
      contactPhone,
      zipCode,
      province,
      city,
      street,
      streetNumber,
      apartmentNumber,
      streetOne,
      streetTwo,
      aditional,
      fkUser,
    });
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
