'use strict';

const { v4: uuidv4 } = require('uuid');
const { Role } = require('../models');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(Role.tableName, [
      {
        id: uuidv4(),
        name: 'Owner',
        description: 'Usuario dueño del E-Commerce/Shop con acceso de total.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Customer',
        description:
          'Usuarios que pueden comprar productos en la tienda en línea.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Employee',
        description: 'Empleado del E-Commerce o de un Seller.',
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
