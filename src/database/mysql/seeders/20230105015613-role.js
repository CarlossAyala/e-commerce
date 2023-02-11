'use strict';

const { v4: uuidv4 } = require('uuid');
const { Role } = require('../models');
const Roles = require('../../../constant/roles.constant');

const { ecommerce, store, both } = Role.enums.madeFor;

const ECOMMERCE_ROLES = Object.values(Roles.ecommerce);
const STORE_ROLES = Object.values(Roles.store);
const BOTH_ROLES = Object.values(Roles.both);

function generateProperties(collections, madeFor) {
  const collectionWithProperties = [];

  for (const collection of collections) {
    const newCollection = {
      id: uuidv4(),
      ...collection,
      made_for: madeFor,
      created_at: new Date(),
      updated_at: new Date(),
    };
    collectionWithProperties.push(newCollection);
  }

  return collectionWithProperties;
}

module.exports = {
  async up(queryInterface) {
    const ecommerceRoles = generateProperties(ECOMMERCE_ROLES, ecommerce);
    const storeRoles = generateProperties(STORE_ROLES, store);
    const bothRoles = generateProperties(BOTH_ROLES, both);

    await queryInterface.bulkInsert(Role.tableName, [
      ...ecommerceRoles,
      ...storeRoles,
      ...bothRoles,
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Role.tableName, null, {});
  },
};
