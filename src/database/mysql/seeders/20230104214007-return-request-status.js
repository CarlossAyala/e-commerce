'use strict';

const { v4: uuidv4 } = require('uuid');
const { ReturnRequestStatus } = require('../models');

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
    await queryInterface.bulkInsert(ReturnRequestStatus.tableName, [
      {
        id: uuidv4(),
        name: 'Iniciado',
        description:
          'La solicitud de devolución ha sido enviada por el cliente.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'En curso',
        description:
          'La solicitud de devolución está siendo revisada por el vendedor.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Aprobado',
        description:
          'La devolución del producto ha sido aprobada y se ha realizado el reembolso al cliente.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Rechazado',
        description:
          'La solicitud de devolución ha sido rechazada por el vendedor.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Cancelado',
        description:
          'La solicitud de devolución ha sido cancelada por el cliente.',
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
    await queryInterface.bulkDelete(ReturnRequestStatus.tableName, null, {});
  },
};
