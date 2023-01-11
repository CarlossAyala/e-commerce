'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const { Role, Business, UserRole } = require('../models');

const createRandomBusiness = (userId) => {
  const name = faker.helpers.unique(faker.company.name);

  const withImage = 640;
  const heightImage = 480;

  return {
    id: uuidv4(),
    name,
    profile: faker.image.business(withImage, heightImage),
    official: faker.datatype.boolean(),
    fk_user: userId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateBusinesses = (sellers) => {
  const businesses = [];

  for (const seller of sellers) {
    const business = createRandomBusiness(seller.fkUser);
    businesses.push(business);
  }

  return businesses;
};

module.exports = {
  async up(queryInterface) {
    try {
      // Capture Seller Role
      const sellerRole = await Role.model.findOne({
        where: {
          name: 'Seller',
        },
      });

      // Get users id with Seller Role
      const sellers = await UserRole.model.findAll({
        where: {
          fkRole: sellerRole.id,
        },
      });

      // Generate business for each seller, one per seller
      const businesses = generateBusinesses(sellers); 

      // Create businesses
      await queryInterface.bulkInsert(Business.tableName, businesses);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Business.tableName, null, {});
  },
};
