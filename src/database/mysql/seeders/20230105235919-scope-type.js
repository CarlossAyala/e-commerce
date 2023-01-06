'use strict';

const { v4: uuidv4 } = require('uuid');
const { ScopeType } = require('../models');

const { ecommerce, seller } = ScopeType.enums;

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
    await queryInterface.bulkInsert(ScopeType.tableName, [
      {
        id: uuidv4(),
        name: 'Owner',
        description: 'Persona propietaria del E-Commerce.',
        type: ecommerce,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Security Manager',
        description:
          'Persona encargada de gestionar los Roles, Scopes y Permisos del E-Commerce.',
        type: ecommerce,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Category Manager',
        description:
          'Persona encargada de gestionar las categorías del E-Commerce.',
        type: ecommerce,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Brand Verification Manager',
        description:
          'Persona encargada de verificar si una tienda del E-Commerce es una Tienda Oficial.',
        type: ecommerce,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Manager',
        description:
          'Persona encargada de gestionar los productos de una tienda.',
        type: seller,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Returns Manager',
        description:
          'Persona encargada de gestionar los pedidos de devolución de productos de una tienda.',
        type: seller,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Questions Manager',
        description:
          'Persona encargada de gestionar las preguntas y respuestas sobre los productos de una tienda.',
        type: seller,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Review Manager',
        description:
          'Persona encargada de analizar las reseñas de los productos de una tienda.',
        type: seller,
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
    await queryInterface.bulkDelete(ScopeType.tableName, null, {});
  },
};
