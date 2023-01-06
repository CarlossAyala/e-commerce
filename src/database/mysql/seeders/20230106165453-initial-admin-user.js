'use strict';

const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { User, Role } = require('../models');

const { name, lastName, email, password } = config.admin;

module.exports = {
  async up() {
    try {
      // Get Role for Owner
      const ownerRole = await Role.model.findOne({
        where: {
          name: 'Owner',
        },
      });

      // Create Owner User
      await User.model.create({
        name,
        lastName,
        email,
        password: await Encrypter.encrypt(password),
        fkRole: ownerRole.id,
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down() {
    try {
      await User.model.destroy({
        where: {
          email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};
