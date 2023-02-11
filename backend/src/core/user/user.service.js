const { User } = require('../../database/mysql/models');
const encrypter = require('../../utils/encrypter');

class UserService {
  async create({ name, lastName, email, password }) {
    const hashed = await encrypter.encrypt(password);

    return await User.model.create({
      name,
      lastName,
      email,
      password: hashed,
    });
  }

  async getOne(id) {
    return await User.model.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async remove(id) {
    return User.model.destroy({
      where: {
        id,
      },
    });
  }

  async updateFullname(id, { firstName, lastName }) {
    return await User.model.update(
      { firstName, lastName },
      {
        where: {
          id,
        },
      }
    );
  }

  async updateEmail(id, { email }) {
    return await User.model.update(
      { email },
      {
        where: {
          id,
        },
      }
    );
  }

  async changePassword(id, { password }) {
    const hash = await encrypter.encrypt(password);

    return await User.model.update(
      { password: hash },
      {
        where: {
          id,
        },
      }
    );
  }

  async findByEmail(email) {
    return await User.model.findOne({ where: { email } });
  }
}

module.exports = UserService;
