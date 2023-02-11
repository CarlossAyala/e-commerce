'use strict';

const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { User } = require('../models');

const generateUser = async () => {
  const { name, lastName, email, password } = config.admin;

  return {
    id: uuidv4(),
    name,
    last_name: lastName,
    email,
    password: await Encrypter.encrypt(password),
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = {
  async up(queryInterface) {
    try {
      // Generate a User
      const user = await generateUser();

      // Create User
      await queryInterface.bulkInsert(User.tableName, [user]);
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface) {
    /*
      Comment this because in the seed of initial-seller, in the logic for reverting the changes, the tables of users-role and users are eliminated, since it has not yet implemented the way of saving the sellers that are created in their seeder, since they do not have reference or their id's or email's, I cannot delete them.
      Because of this, "user" contains nothing and throws an error when removing it below.
    */
    // try {
    //   const role = await Role.model.findOne({
    //     where: {
    //       name: 'Owner',
    //     },
    //   });
    //   const user = await User.model.findOne({
    //     where: {
    //       email,
    //     },
    //   });
    //   await queryInterface.bulkDelete(UserRole.tableName, {
    //     fk_user: user.id,
    //     fk_role: role.id,
    //   });
    //   await queryInterface.bulkDelete(User.tableName, {
    //     id: user.id,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  },
};
