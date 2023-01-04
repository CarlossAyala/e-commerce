const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const ReturnRequest = require('./return-request.model');
const OrderState = require('./order-state.model');
const ProductCondition = require('./product-condition.model');

const modelName = 'ReturnProcess';
const tableName = 'return_processes';
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
  opened: DataTypes.DATE,
  closed: DataTypes.DATE,
  total: DataTypes.DECIMAL(10, 2),
  price: DataTypes.DECIMAL(10, 2),
  quantity: DataTypes.INTEGER,
  aditional: DataTypes.STRING,
  fkReturnRequest: {
    type: DataTypes.UUID,
    field: 'fk_return_request',
    references: {
      model: ReturnRequest.model,
      key: 'id',
    },
  },
  fkShippingStatus: {
    type: DataTypes.UUID,
    field: 'fk_shipping_status',
    references: {
      model: OrderState.model,
      key: 'id',
    },
  },
  fkProductCondition: {
    type: DataTypes.UUID,
    field: 'fk_product_condition',
    references: {
      model: ProductCondition.model,
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
