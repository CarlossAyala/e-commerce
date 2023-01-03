const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql');
const User = require('./user.model');
const PurchaseOrder = require('./purchase-order.model');
const ReturnStatus = require('./return-status.model');

const modelName = 'ProductReturn';
const tableName = 'product_returns';
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
  requested: DataTypes.DATE,
  approved: DataTypes.DATE,
  received: DataTypes.DATE,
  amount: DataTypes.DECIMAL(10, 2),
  fkOrder: {
    type: DataTypes.UUID,
    field: 'fk_order',
    references: {
      model: PurchaseOrder.model,
      key: 'id',
    },
  },
  fkStatus: {
    type: DataTypes.UUID,
    field: 'fk_status',
    references: {
      model: ReturnStatus.model,
      key: 'id',
    },
  },
  fkCustomer: {
    type: DataTypes.UUID,
    field: 'fk_customer',
    references: {
      model: User.model,
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
