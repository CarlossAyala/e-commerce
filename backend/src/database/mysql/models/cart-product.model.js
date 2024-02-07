const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const User = require("./user.model");
const Product = require("./product.model");

const modelName = "CartProduct";
const tableName = "carts_products";
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  quantity: DataTypes.INTEGER,
  customerId: {
    primaryKey: true,
    type: DataTypes.UUID,
    field: "customer_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  productId: {
    primaryKey: true,
    type: DataTypes.UUID,
    field: "product_id",
    references: {
      model: Product.model,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
