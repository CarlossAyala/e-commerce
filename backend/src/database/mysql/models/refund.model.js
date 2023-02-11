const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Return = require('./return.model');

const modelName = 'Refund';
const tableName = 'refunds';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  status: {
    pending: 'Pending',
    completed: 'Completed',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  open: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  close: DataTypes.DATE,
  amount: DataTypes.DECIMAL(10, 2),
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums.status),
  },
  customerId: {
    type: DataTypes.UUID,
    field: 'customer_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  returnId: {
    type: DataTypes.UUID,
    field: 'return_id',
    references: {
      model: Return.model,
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
