'use strict';

const { v4: uuidv4 } = require('uuid');
const { ProductCondition } = require('../models');

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
    await queryInterface.bulkInsert(ProductCondition.tableName, [
      {
        id: uuidv4(),
        name: 'Nuevo',
        description: 'Este producto nunca ha sido usado antes.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Usado',
        description: 'Este producto ha sido utilizado previamente.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Reacondicionado',
        description:
          'Este producto contiene piezas que fueron reemplazadas y testeadas para que funcione y luzca como nuevo.',
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
    await queryInterface.bulkDelete(ProductCondition.tableName, null, {});
  },
};
