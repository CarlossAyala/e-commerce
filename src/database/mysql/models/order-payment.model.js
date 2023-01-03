const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Department = require('./department.model');

const modelName = 'OrderPayment';
const tableName = 'order_payments';
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
  amount: DataTypes.DECIMAL(10, 2),
  fkDepartment: {
    type: DataTypes.UUID,
    field: 'fk_department',
    references: {
      model: Department.model,
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
