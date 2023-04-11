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

  getOne(id) {
    return User.model.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  remove(id) {
    return User.model.destroy({
      where: {
        id,
      },
    });
  }

  findByEmail(email) {
    return User.model.findOne({ where: { email } });
  }
}

module.exports = UserService;
