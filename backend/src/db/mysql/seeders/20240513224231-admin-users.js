"use strict";

const { admin } = require("../../../config");
const { generateRandomUser } = require("../utils");

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

    const user = await generateRandomUser({
      email: admin.email,
      password: admin.password,
      isAdmin: true,
      isFromSeed: true,
    });

    await queryInterface.bulkInsert("Users", [user]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "Users",
      {
        email: admin.email,
      },
      {},
    );
  },
};
