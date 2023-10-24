"use strict";

const { v4: uuidv4 } = require("uuid");
const { admin } = require("../../../config");
const { Roles, User, UsersRoles } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const user = await User.model.findOne({
      where: {
        email: admin.email,
      },
    });

    const roles = await Roles.model.findAll();
    const userRoles = roles.map((role) => ({
      id: uuidv4(),
      user_id: user.id,
      role_id: role.id,
    }));

    return queryInterface.bulkInsert(UsersRoles.tableName, userRoles);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(UsersRoles.tableName, null, {});
  },
};
