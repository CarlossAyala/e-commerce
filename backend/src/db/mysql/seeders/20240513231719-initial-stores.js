"use strict";

const ms = require("ms");
const { generateRandomStore } = require("../utils");
const { getRandomIntByRange } = require("../../../utils");

/** @type {import('sequelize-cli').Migration} */
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
    const [users] = await queryInterface.sequelize.query(
      "SELECT id FROM Users",
    );
    const stores = users.map(({ id: userId }) =>
      generateRandomStore({
        userId,
        createdAt: new Date(Date.now() - getRandomIntByRange(0, ms("1y"))),
      }),
    );
    await queryInterface.bulkInsert("Stores", stores);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Stores", null, {});
  },
};
