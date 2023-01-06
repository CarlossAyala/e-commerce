'use strict';

const { v4: uuidv4 } = require('uuid');
const { Permission } = require('../models');

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
    await queryInterface.bulkInsert(Permission.tableName, [
      {
        id: uuidv4(),
        name: 'Create',
        description: 'Permiso para crear registros.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Read',
        description: 'Permiso para ver registros.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Update',
        description: 'Permiso para actualizar registros.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Delete',
        description: 'Permiso para eliminar registros.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'All',
        description: 'Permiso para todo.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      // More incoming, like download, print
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(Permission.tableName, null, {});
  },
};
