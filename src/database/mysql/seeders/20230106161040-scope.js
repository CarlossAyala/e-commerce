'use strict';

const { v4: uuidv4 } = require('uuid');
const { Scope } = require('../models');

const { system, store, mix } = Scope.enums;

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(Scope.tableName, [
      {
        id: uuidv4(),
        name: 'Security System Manager',
        description:
          'Persona encargada de gestionar los Roles, Scopes y Permisos del E-Commerce.',
        made_for: system,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Security Store Manager',
        description:
          'Persona encargada de gestionar los Roles, Scopes y Permisos de una Tienda.',
        made_for: system,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Category Manager',
        description:
          'Persona encargada de gestionar las categorías del E-Commerce.',
        made_for: system,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Brand Verification Manager',
        description:
          'Persona encargada de verificar si una Tienda del E-Commerce es Oficial.',
        made_for: system,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Manager',
        description:
          'Persona encargada de gestionar los productos de una tienda.',
        made_for: store,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Returns Manager',
        description:
          'Persona encargada de gestionar los pedidos de devolución de productos de una tienda.',
        made_for: store,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Questions Manager',
        description:
          'Persona encargada de gestionar las preguntas y respuestas sobre los productos de una tienda.',
        made_for: store,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Product Review Manager',
        description:
          'Persona encargada de analizar las reseñas de los productos de una tienda.',
        made_for: store,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Scope.tableName, null, {});
  },
};
