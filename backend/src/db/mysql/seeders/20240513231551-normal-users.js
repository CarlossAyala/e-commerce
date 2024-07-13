"use strict";

const ms = require("ms");
const { getRandomIntByRange } = require("../../../utils");
const { generateRandomUser } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = await Promise.all(
      new Array(5).fill(0).map(() => {
        const createdAt = new Date(
          Date.now() - getRandomIntByRange(0, ms("1y")),
        );

        return generateRandomUser({
          isAdmin: false,
          isFromSeed: true,
          createdAt,
        });
      }),
    );
    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
