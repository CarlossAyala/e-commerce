const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql');
const User = require('./user.model');
const OrderState = require('./order-state.model');
const CardRegister = require('./card-register.model');

const modelName = 'PurchaseOrder';
const tableName = 'purchase_orders';
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
  total: DataTypes.DECIMAL(10, 2),
  fkStatus: {
    type: DataTypes.UUID,
    field: 'fk_status',
    references: {
      model: OrderState.model,
      key: 'id',
    },
  },
  fkCardPayment: {
    type: DataTypes.UUID,
    field: 'fk_card_payment',
    references: {
      model: CardRegister.model,
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
