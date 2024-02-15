const { DataTypes } = require("sequelize");
const User = require("./user.model");
const sequelize = require("../connection");

const modelName = "RefreshToken";
const tableName = "refresh_tokens";
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
  token: DataTypes.STRING,
  userId: {
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: DataTypes.NOW,
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
