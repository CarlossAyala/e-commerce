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
    const role = await Roles.model.findOne({
      where: {
        name: Roles.permissions.crud_categories,
      },
    });

    return queryInterface.bulkInsert(UsersRoles.tableName, [
      {
        id: uuidv4(),
        user_id: user.id,
        role_id: role.id,
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete(UsersRoles.tableName, null, {});
  },
};
