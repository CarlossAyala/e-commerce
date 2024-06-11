"use strict";

const { generateRandomStore } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const [users] = await queryInterface.sequelize.query(
      "SELECT id FROM Users"
    );
    const stores = users.map(({ id: userId }) =>
      generateRandomStore({ userId })
    );
    await queryInterface.bulkInsert("Stores", stores);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Stores", null, {});
  },
};
