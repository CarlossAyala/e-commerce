const ms = require("ms");
const { getRandomIntByRange } = require("../../../utils");
const { generateRandomProduct } = require("../utils");

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
    const [categories] = await queryInterface.sequelize.query(
      "SELECT id FROM Categories",
    );
    const categoriesIds = categories.map((category) => category.id);
    const [stores] = await queryInterface.sequelize.query(
      "SELECT id FROM Stores",
    );
    const storesIds = stores.map((store) => store.id);
    const products = storesIds.flatMap((storeId) => {
      return new Array(10).fill(0).map(() => {
        return generateRandomProduct({
          storeId,
          categoriesIds,
          createdAt: new Date(Date.now() - getRandomIntByRange(0, ms("1y"))),
        });
      });
    });

    await queryInterface.bulkInsert("Products", products);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
