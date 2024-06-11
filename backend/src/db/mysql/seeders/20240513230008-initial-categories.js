"use strict";

const { generateRandomCategory } = require("../utils");

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
    const categories = new Array(50)
      .fill(0)
      .map(() => generateRandomCategory());
    const categoriesIds = categories.map((category) => category.id);
    const subCategories = categoriesIds.map((parentId) =>
      generateRandomCategory({
        parentId,
      })
    );
    await queryInterface.bulkInsert("Categories", [
      ...categories,
      ...subCategories,
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
