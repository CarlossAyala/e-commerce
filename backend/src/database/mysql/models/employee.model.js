const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Business = require('./store.model');

const modelName = 'Employee';
const tableName = 'employees';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  type: {
    ecommerce: 'ecommerce',
    store: 'store',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING,
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name',
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  hireDate: {
    type: DataTypes.STRING,
    field: 'hire_date',
  },
  type: {
    type: DataTypes.ENUM,
    values: Object.values(enums.type),
  },
  businessId: {
    type: DataTypes.UUID,
    field: 'business_id',
    references: {
      model: Business.model,
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
  enums,
};
