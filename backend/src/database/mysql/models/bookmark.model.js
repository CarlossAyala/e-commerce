const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const User = require('./user.model');
const Product = require('./product.model');

const modelName = 'Bookmark';
const tableName = 'bookmarks';
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  customerId: {
    type: DataTypes.UUID,
    primaryKey: true,
    field: 'customer_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    primaryKey: true,
    references: {
      model: Product.model,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
