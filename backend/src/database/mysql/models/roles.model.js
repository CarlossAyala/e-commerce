const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const modelName = "Role";
const tableName = "roles";
const modelOptions = {
  tableName,
  timestamps: false,
};

const permissions = {
  crud_categories: "crud:categories",
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    unique: "name",
  },
  description: DataTypes.STRING,
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
  permissions,
};
