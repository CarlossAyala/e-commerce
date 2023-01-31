const Encrypter = require('../../../utils/encrypter');
const { Employee } = require('../../../database/mysql/models');

class EcommerceService {
  async create({ name, lastName, email, password }) {
    const { ecommerce } = Employee.enums.type;
    const hashed = await Encrypter.encrypt(password);

    return Employee.model.create({
      name,
      lastName,
      email,
      password: hashed,
      hireDate: new Date(),
      type: ecommerce,
    });
  }

  getOne(id) {
    return Employee.model.findByPk(id);
  }

  getAll() {
    const { ecommerce } = Employee.enums.type;

    return Employee.model.findAll({
      where: {
        type: ecommerce,
      },
    });
  }

  updateName(id, { name, lastName }) {
    return Employee.model.update(
      { name, lastName },
      {
        where: {
          id,
        },
      }
    );
  }

  updateEmail(id, { email }) {
    return Employee.model.update(
      { email },
      {
        where: {
          id,
        },
      }
    );
  }

  async updatePassword(id, { password }) {
    const hashed = await Encrypter.encrypt(password);

    return Employee.model.update(
      { password: hashed },
      {
        where: {
          id,
        },
      }
    );
  }

  updateHireDate(id, { hireDate }) {
    return Employee.model.update(
      { hireDate },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Employee.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = EcommerceService;
