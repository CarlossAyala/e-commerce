const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql');
const ReturnItemStatus = require('./return-item-status.model');
const OrderItem = require('./order-item.model');
const ProductReturn = require('./product-return.model');

const modelName = 'ReturnItem';
const tableName = 'return_items';
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
  quantity: DataTypes.INTEGER,
  total: DataTypes.DECIMAL(10, 2),
  reason: DataTypes.STRING,
  fkOrderItem: {
    type: DataTypes.UUID,
    field: 'fk_order_item',
    references: {
      model: OrderItem.model,
      key: 'id',
    },
  },
  fkOrderReturn: {
    type: DataTypes.UUID,
    field: 'fk_order_return',
    references: {
      model: ProductReturn.model,
      key: 'id',
    },
  },
  fkStatus: {
    type: DataTypes.UUID,
    field: 'fk_status',
    references: {
      model: ReturnItemStatus.model,
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
