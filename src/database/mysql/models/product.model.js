const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Category = require('./category.model');
const ProductCondition = require('./product-condition.model');
const User = require('./user.model');

const modelName = 'Product';
const tableName = 'products';
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
  stock: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  sold: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  price: DataTypes.DECIMAL(10, 2),
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fkCategory: {
    type: DataTypes.UUID,
    field: 'fk_category',
    references: {
      model: Category.model,
      key: 'id',
    },
  },
  fkCondition: {
    type: DataTypes.UUID,
    field: 'fk_condition',
    references: {
      model: ProductCondition.model,
      key: 'id',
    },
  },
  fkSeller: {
    type: DataTypes.UUID,
    field: 'fk_seller',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
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
