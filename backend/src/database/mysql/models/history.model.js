const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user.model");
const Product = require("./product.model");

const modelName = "History";
const tableName = "history";
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
  customerId: {
    type: DataTypes.UUID,
    field: "customer_id",
    primaryKey: true,
    references: {
      model: User.model,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: "product_id",
    primaryKey: true,
    references: {
      model: Product.model,
      key: "id",
    },
  },
  lastSeenAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "last_seen_at",
    primaryKey: true,
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
