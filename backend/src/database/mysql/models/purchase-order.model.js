const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql');
const User = require('./user.model');
const Address = require('./address.model');

const modelName = 'PurchaseOrder';
const tableName = 'purchase_orders';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  pending: 'pending',
  process: 'in process',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
  return: 'return',
  refunded: 'refunded',
  completed: 'completed',
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  total: DataTypes.DECIMAL(10, 2),
  state: {
    type: DataTypes.ENUM,
    values: Object.values(enums),
  },
  cardEntity: {
    type: DataTypes.STRING,
    field: 'card_entity',
  },
  cardNumber: {
    type: DataTypes.STRING(4),
    field: 'card_number',
  },
  addressId: {
    type: DataTypes.UUID,
    field: 'address_id',
    references: {
      model: Address.model,
      key: 'id',
    },
  },
  customerId: {
    type: DataTypes.UUID,
    field: 'customer_id',
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
  enums,
};
