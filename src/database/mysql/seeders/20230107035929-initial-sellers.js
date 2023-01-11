'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { User, Role, UserRole } = require('../models');

const createRandomUsers = async () => {
  const userSex = faker.name.sex();
  const name = faker.name.firstName(userSex);
  const lastName = faker.name.lastName(userSex);
  const email = faker.helpers.unique(faker.internet.email, [name, lastName]);
  const password = await Encrypter.encrypt(config.seller.password);

  return {
    id: uuidv4(),
    name,
    last_name: lastName,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNUsers = async (n = 1) => {
  const users = [];
  for (let i = 1; i <= n; i++) {
    const user = await createRandomUsers();
    users.push(user);
  }

  return users;
};

const generateSeller = (user, role) => {
  return {
    id: uuidv4(),
    fk_user: user.id,
    fk_role: role.id,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = {
  async up(queryInterface) {
    try {
      const NUM_SELLERS = 5;

      // Capture Seller Role
      const sellerRole = await Role.model.findOne({
        where: {
          name: 'Seller',
        },
      });

      // Generate Users
      const users = await generateNUsers(NUM_SELLERS);

      // Generate Sellers
      const sellers = [];
      for (const user of users) {
        const seller = generateSeller(user, sellerRole);
        sellers.push(seller);
      }

      // Create users
      await queryInterface.bulkInsert(User.tableName, users);
      // Create users with Sellers Role
      await queryInterface.bulkInsert(UserRole.tableName, sellers);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    // TODO: How to delete users and roles created above?
    // maybe should creating a file with those at the moment were are created
    // and then delete them by their id's
    await queryInterface.bulkDelete(UserRole.tableName, null, {});
    await queryInterface.bulkDelete(User.tableName, null, {});
  },
};
