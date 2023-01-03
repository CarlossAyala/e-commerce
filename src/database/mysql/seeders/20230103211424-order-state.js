'use strict';

const { v4: uuidv4 } = require('uuid');
const { OrderState } = require('../models');

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
    await queryInterface.bulkInsert(OrderState.tableName, [
      {
        id: uuidv4(),
        name: 'Realizado',
        description:
          'El pedido se ha realizado y está en cola para ser procesado.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Procesando',
        description:
          'El pedido se está procesando y se están preparando para el envío.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Enviado',
        description:
          'El pedido se ha enviado y se encuentra en camino hacia la dirección de entrega.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Entregadio',
        description: 'El pedido se ha entregado en la dirección de entrega.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Cancelado',
        description: 'El pedido se ha cancelado.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Devuelto',
        description:
          'El pedido se ha devuelto después de haber sido entregado.',
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
    await queryInterface.bulkDelete(OrderState.tableName, null, {});
  },
};
