const Roles = {
  ecommerce: {
    owner: {
      name: 'E-Commerce Owner',
      description: 'Persona dueña del E-Commerce con acceso total.',
    },
    categoryManager: {
      name: 'Category Manager',
      description:
        'Persona encargada de gestionar las categorías del E-Commerce.',
    },
    brandManager: {
      name: 'Brand Verification Manager',
      description:
        'Persona encargada de verificar si una Tienda del E-Commerce es Oficial.',
    },
  },
  store: {
    owner: {
      name: 'Store Owner',
      description: 'Persona dueña de una Tienda con acceso total.',
    },
    productManager: {
      name: 'Product Manager',
      description:
        'Persona encargada de gestionar los productos de una Tienda.',
    },
    returnManager: {
      name: 'Return Manager',
      description:
        'Persona encargada de gestionar los pedidos de devolución de productos de una Tienda.',
    },
    productQAManager: {
      name: 'Product QA Manager',
      description:
        'Persona encargada de gestionar las preguntas y respuestas sobre los productos de una Tienda.',
    },
  },
  both: {
    employeeRoleManager: {
      name: 'Employee Roles Manager',
      description: 'Persona encargada de gestionar los Roles de los Empleados.',
    },
    allPrivileges: {
      name: 'All privileges',
      description: 'Persona con todos los Roles.',
    },
  },
};

module.exports = Roles;
