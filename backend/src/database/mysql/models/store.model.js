const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user.model");

const modelName = "Store";
const tableName = "stores";
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
  description: DataTypes.STRING,
  profile: DataTypes.STRING,
  slug: {
    type: DataTypes.STRING,
    unique: "slug",
  },
  sellerId: {
    type: DataTypes.UUID,
    field: "seller_id",
    references: {
      model: User.model,
      key: "id",
    },
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
