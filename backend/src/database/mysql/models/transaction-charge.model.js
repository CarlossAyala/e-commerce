const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const Transaction = require('./transaction.model');
const Charge = require('./charge.model');

const modelName = 'TransactionCharge';
const tableName = 'transaction_charges';
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
  fkTransaction: {
    type: DataTypes.UUID,
    field: 'fk_transaction',
    references: {
      model: Transaction.model,
      key: 'id',
    },
  },
  fkCharge: {
    type: DataTypes.UUID,
    field: 'fk_charge',
    references: {
      model: Charge.model,
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
