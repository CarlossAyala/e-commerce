"use strict";

const { v4: uuidv4 } = require("uuid");
const { Roles } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(Roles.tableName, [
      {
        id: uuidv4(),
        name: Roles.permissions.crud_categories,
        description: "Can CRUD categories",
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(Roles.tableName, null, {});
  },
};
