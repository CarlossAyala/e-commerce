'use strict';

const { v4: uuidv4 } = require('uuid');
const { Role } = require('../models');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(Role.tableName, [
      {
        id: uuidv4(),
        name: 'Owner',
        description: 'Usuario dueño del E-Commerce con acceso total.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Seller',
        description: 'Usuario dueño de una tienda con acceso total.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Customer',
        description: 'Usuario que utiliza el sistema E-Commerce.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Employee System',
        description: 'Empleado del E-Commerce.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Employee Store',
        description: 'Empleado del E-Commerce.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(Role.tableName, null, {});
  },
};
