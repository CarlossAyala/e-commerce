const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Category = require('./category.model');
const BusinessSeller = require('./business-seller.model');

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
  price: DataTypes.DECIMAL(10, 2),
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  condition: {
    type: DataTypes.ENUM,
    values: Object.values(enums.condition),
  },
  fkCategory: {
    type: DataTypes.UUID,
    field: 'fk_category',
    references: {
      model: Category.model,
      key: 'id',
    },
  },
  fkBusiness: {
    type: DataTypes.UUID,
    field: 'fk_business',
    references: {
      model: BusinessSeller.model,
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
