"use strict";

const { generateRandomQuestion } = require("../utils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const [[user]] = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE isFromSeed = true AND isAdmin = true LIMIT 1",
    );
    const [products] = await queryInterface.sequelize.query(
      "SELECT id FROM Products ORDER BY RAND() LIMIT 30",
    );

    const userId = user.id;
    const productIds = products.map((p) => p.id);

    let id = 1;
    const questions = productIds.flatMap((productId) => {
      const pending = new Array(10).fill("").map(() => {
        return generateRandomQuestion({
          id: id++,
          status: "pending",
          userId,
          productId,
        });
      });
      const answered = new Array(30).fill("").map(() => {
        return generateRandomQuestion({
          id: id++,
          status: "answered",
          userId,
          productId,
        });
      });
      const rejected = new Array(10).fill("").map(() => {
        return generateRandomQuestion({
          id: id++,
          status: "rejected",
          userId,
          productId,
        });
      });
      return [...pending, ...answered, ...rejected];
    });

    await queryInterface.bulkInsert("Questions", questions);
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
