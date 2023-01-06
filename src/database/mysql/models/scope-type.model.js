const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');

const modelName = 'ScopeType';
const tableName = 'scopes_types';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  ecommerce: 'e-commerce',
  store: 'store',
  mix: 'mix',
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING(50),
  description: DataTypes.STRING,
  type: {
    type: DataTypes.ENUM,
    values: Object.values(enums),
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
  enums,
};
