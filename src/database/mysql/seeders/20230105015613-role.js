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
        name: 'Seller',
        description:
          'Usuarios que pueden publicar productos en la tienda en línea.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Customer',
        description:
          'Usuarios que pueden comprar productos en la tienda en línea.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Owner',
        description:
          'Usuario dueño del E-Commerce con acceso de administrador.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'E-Commerce Employee',
        description: 'Empleado del propio E-Commerce.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Seller Employee',
        description: 'Empleado de un Seller.',
        createdAt: new Date(),
        updatedAt: new Date(),
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
