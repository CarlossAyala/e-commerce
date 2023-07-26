const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql');
const User = require('./user.model');

const modelName = 'Order';
const tableName = 'orders';
const modelOptions = {
  tableName,
  timestamps: false,
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
  // street + apartment number
  address: DataTypes.STRING,
  // person name + phone
  destinataire: DataTypes.STRING,
  // province (zipcode) + city
  destination: DataTypes.STRING,
  indications: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums),
    defaultValue: enums.pending,
  },
  customerId: {
    type: DataTypes.UUID,
    field: 'customer_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    field: 'payment_intent_id',
  },
  orderedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'ordered_at',
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
