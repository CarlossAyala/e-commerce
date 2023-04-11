const { User } = require('../../database/mysql/models');
const encrypter = require('../../utils/encrypter');

class AccountService {
  getUserById(id) {
    return User.model.findByPk(id);
  }

  changeName(id, { name, lastName }) {
    return User.model.update(
      { name, lastName },
      {
        where: {
          id,
        },
      }
    );
  }

  async changePassword(id, newPassword) {
    const hash = await encrypter.encrypt(newPassword);

    return User.model.update(
      { password: hash },
      {
        where: {
          id,
        },
      }
    );
  }
}

module.exports = AccountService;
