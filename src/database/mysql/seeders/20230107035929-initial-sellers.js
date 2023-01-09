'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { User, Role } = require('../models');

const createRandomSeller = async (roleId) => {
  const password =
    (await Encrypter.encrypt(config.seller.password)) ||
    (await Encrypter.encrypt(email));

  const userSex = faker.name.sex();
  const name = faker.name.firstName(userSex);
  const lastName = faker.name.lastName(userSex);
  const email = faker.helpers.unique(faker.internet.email, [name, lastName]);

  return {
    id: uuidv4(),
    name,
    last_name: lastName,
    email,
    password,
    fk_role: roleId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNSellers = async (n = 1, role = {}) => {
  const sellers = [];
  for (let i = 1; i <= n; i++) {
    const seller = await createRandomSeller(role.id);
    sellers.push(seller);
  }

  return sellers;
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

      // Generate users with Seller Role
      const sellers = await generateNSellers(NUM_SELLERS, sellerRole);

      // Create sellers
      await queryInterface.bulkInsert(User.tableName, sellers);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(User.tableName, null, {});
  },
};
