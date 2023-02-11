const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const ChargeCategory = require('./charge-category.model');

const modelName = 'Charge';
const tableName = 'charges';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  fixed: 'fixed',
  rate: 'rate',
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
  rate: DataTypes.DECIMAL(3, 1),
  amount: DataTypes.DECIMAL(10, 2),
  active: DataTypes.BOOLEAN,
  fkChargeCategory: {
    type: DataTypes.UUID,
    field: 'fk_charge_category',
    references: {
      model: ChargeCategory.model,
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
