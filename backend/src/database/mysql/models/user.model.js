const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const modelName = "User";
const tableName = "users";
const modelOptions = {
  tableName,
  timestamps: true,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  lastName: {
    type: DataTypes.STRING,
    field: "last_name",
  },
  email: {
    type: DataTypes.STRING,
    unique: "email",
  },
  password: DataTypes.STRING,
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_admin",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
