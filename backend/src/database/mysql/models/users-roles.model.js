const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user.model");
const Roles = require("./roles.model");

const modelName = "UsersRoles";
const tableName = "users_roles";
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.UUID,
    field: "role_id",
    references: {
      model: Roles.model,
      key: "id",
    },
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
