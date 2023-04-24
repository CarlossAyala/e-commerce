const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Category = require('./category.model');
const Store = require('./store.model');

const modelName = 'Product';
const tableName = 'products';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  condition: {
    new: 'new',
    used: 'used',
    reconditioned: 'reconditioned',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  stock: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  sold: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
  slug: DataTypes.STRING,
  price: DataTypes.DECIMAL(10, 2),
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  condition: {
    type: DataTypes.ENUM,
    values: Object.values(enums.condition),
  },
  categoryId: {
    type: DataTypes.UUID,
    field: 'category_id',
    references: {
      model: Category.model,
      key: 'id',
    },
  },
  storeId: {
    type: DataTypes.UUID,
    field: 'store_id',
    references: {
      model: Store.model,
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
  enums,
};
