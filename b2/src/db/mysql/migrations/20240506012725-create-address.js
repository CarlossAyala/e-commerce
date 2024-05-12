"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      phone: {
        type: Sequelize.STRING(20),
      },
      zipCode: {
        type: Sequelize.STRING(5),
      },
      province: {
        type: Sequelize.STRING(50),
      },
      city: {
        type: Sequelize.STRING(50),
      },
      street: {
        type: Sequelize.STRING(100),
      },
      apartmentNumber: {
        type: Sequelize.STRING(5),
      },
      indications: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
