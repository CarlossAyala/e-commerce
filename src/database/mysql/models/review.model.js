const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Product = require('./product.model');

const modelName = 'Review';
const tableName = 'reviews';
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
  title: DataTypes.STRING(50),
  comment: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislike: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  customerId: {
    type: DataTypes.UUID,
    field: 'customer_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
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
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
