"use strict";

const { generateRandomReview } = require("../utils");

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

    const [items] = await queryInterface.sequelize.query(
      "SELECT * FROM OrderItems ORDER BY RAND() LIMIT 1250",
    );

    let id = 1;
    await Promise.all(
      items.map(async (item) => {
        const review = generateRandomReview({ id });
        id++;

        await queryInterface.bulkInsert("Reviews", [review]);

        await queryInterface.sequelize.query(
          "UPDATE OrderItems SET reviewId = ? WHERE id = ?",
          {
            replacements: [review.id, item.id],
          },
        );
      }),
    );
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkUpdate("OrderItems", { reviewId: null }, {});
  },
};
