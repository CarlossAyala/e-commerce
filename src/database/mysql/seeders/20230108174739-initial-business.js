'use strict';

const config = require('../../../config');
const Encrypter = require('../../../utils/encrypter');
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const { User, Business } = require('../models');

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

const createRandomBusiness = (userId) => {
  const name = faker.helpers.unique(faker.company.name);

  const withImage = 640;
  const heightImage = 480;

  return {
    id: uuidv4(),
    name,
    profile: faker.image.business(withImage, heightImage),
    official: faker.datatype.boolean(),
    user_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateBusinesses = (owners) => {
  const businesses = [];

  for (const owner of owners) {
    const business = createRandomBusiness(owner.id);
    businesses.push(business);
  }

  return businesses;
};

module.exports = {
  async up(queryInterface) {
    try {
      /*
        - Generate  Store Owner Users
        - Generate business for each one
      */
      const NUM_OWNERS = 5;

      const owners = await generateNUsers(NUM_OWNERS);

      // Generate business for each owner
      const businesses = generateBusinesses(owners);

      // Create users
      await queryInterface.bulkInsert(User.tableName, owners);
      // Create businesses
      await queryInterface.bulkInsert(Business.tableName, businesses);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Business.tableName, null, {});
    await queryInterface.bulkDelete(User.tableName, null, {});
  },
};
