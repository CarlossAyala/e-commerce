'use strict';

const { v4: uuidv4 } = require('uuid');
const { QuestionStatus } = require('../models');

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
    await queryInterface.bulkInsert(QuestionStatus.tableName, [
      {
        id: uuidv4(),
        name: 'Contestada',
        description: 'La pregunta ha sido respondida.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Pendiente',
        description: 'La pregunta está en la espera para ser respondida.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Rechazado',
        description:
          'La pregunta ha sido rechazada porque no es relevante o apropiada.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Duplicado',
        description:
          'La pregunta es un duplicado de otra pregunta que ya ha sido respondida.',
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
    await queryInterface.bulkDelete(QuestionStatus.tableName, null, {});
  },
};
