const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user.model');
const PurchaseOrder = require('./purchase-order.model');
const OrderItem = require('./order-item.model');

const modelName = 'Return';
const tableName = 'returns';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  status: {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
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
  customerQuantity: {
    type: DataTypes.INTEGER,
    field: 'customer_quantity',
  },
  storeQuantity: {
    type: DataTypes.INTEGER,
    field: 'store_quantity',
  },
  customerReason: {
    type: DataTypes.STRING,
    field: 'customer_reason',
  },
  storeReason: {
    type: DataTypes.STRING,
    field: 'store_reason',
  },
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
  orderId: {
    type: DataTypes.UUID,
    field: 'order_id',
    references: {
      model: PurchaseOrder.model,
      key: 'id',
    },
  },
  orderItemId: {
    type: DataTypes.UUID,
    field: 'order_item_id',
    references: {
      model: OrderItem.model,
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
