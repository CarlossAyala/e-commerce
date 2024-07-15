"use strict";

const crypto = require("node:crypto");
const { admin } = require("../../../config");

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

    await queryInterface.bulkInsert("Addresses", [
      {
        id: crypto.randomUUID(),
        name: `${user.name} ${user.email}`,
        phone: "+54 9 376 4123456",
        zipCode: "1100",
        province: "Misiones",
        city: "Posadas",
        street: "Calle Falsa 123",
        apartmentNumber: "S/N",
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const [[user]] = await queryInterface.sequelize.query(
      "SELECT * FROM `Users` WHERE `email` = ?",
      {
        replacements: [admin.email],
      },
    );

    await queryInterface.bulkDelete("Addresses", {
      userId: user.id,
    });
  },
};
