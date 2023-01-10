'use strict';

const config = require('../../../config');
const BulkGenerator = require('../../../utils/database/bulk-insert');
const { User, Role, UserRole } = require('../models');

const { name, lastName, email, password } = config.admin;

module.exports = {
  async up(queryInterface) {
    try {
      // Get Role for Owner
      const ownerRole = await Role.model.findOne({
        where: {
          name: 'Owner',
        },
      });

      // Generate a User
      const user = await BulkGenerator.user(name, lastName, email, password);

      // Generate Owner Role to the User
      const ownerUser = BulkGenerator.userRole(user, ownerRole);

      // Create User
      await queryInterface.bulkInsert(User.tableName, [user]);

      // Create User with Owner role
      await queryInterface.bulkInsert(UserRole.tableName, [ownerUser]);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    try {
      const role = await Role.model.findOne({
        where: {
          name: 'Owner',
        },
      });
      const user = await User.model.findOne({
        where: {
          email,
        },
      });
      await queryInterface.bulkDelete(UserRole.tableName, {
        fk_user: user.id,
        fk_role: role.id,
      });
      await queryInterface.bulkDelete(User.tableName, {
        email,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
