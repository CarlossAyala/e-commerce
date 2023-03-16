'use strict';

const { v4: uuidv4 } = require('uuid');
const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { User, Cart } = require('../models');

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

const generateCart = (userId) => {
  return {
    id: uuidv4(),
    customer_id: userId,
  };
};

module.exports = {
  async up(queryInterface) {
    try {
      // Generate a User
      const user = await generateUser();

      // Generate Cart
      const cart = generateCart(user.id);

      // Create User
      await queryInterface.bulkInsert(User.tableName, [user]);
      // Create Cart
      await queryInterface.bulkInsert(Cart.tableName, [cart]);
    } catch (error) {
      console.log(error);
    }
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface) {
    await queryInterface.bulkDelete(Cart.tableName, null, {});
  },
};
