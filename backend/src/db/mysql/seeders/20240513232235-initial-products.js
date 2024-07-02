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
		const allProducts = [];

		for (const storeId of storesIds) {
			const products = new Array(15).fill(0).map(() =>
				generateRandomProduct({
					storeId,
					categoriesIds,
					createdAt: new Date(Date.now() - getRandomIntByRange(0, ms("1y"))),
				}),
			);
			allProducts.push(products);
		}

		await queryInterface.bulkInsert("Products", allProducts.flat());
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
