"use strict";

const { getRandomIntByRange } = require("../../../utils");
const { generateRandomUser } = require("../utils");
const ms = require("ms");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = await Promise.all(
      new Array(100).fill(0).map(() => {
        const createdAt = new Date(
          Date.now() - getRandomIntByRange(0, ms("1y"))
        );

        return generateRandomUser({
          createdAt,
        });
      })
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
