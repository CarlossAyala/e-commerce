"use strict";

const { admin } = require("../../../config");
const Stripe = require("../../../services/stripe");

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
      "SELECT * FROM Users WHERE email = ?",
      {
        replacements: [admin.email],
      },
    );

    await Stripe.customers.create({
      name: user.name + " " + user.lastName,
      email: admin.email,
    });
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
