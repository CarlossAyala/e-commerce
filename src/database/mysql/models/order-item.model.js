const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const PurchaseOrder = require('./purchase-order.model');
const Product = require('./product.model');

const modelName = 'OrderItem';
const tableName = 'order_items';
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
  name: DataTypes.STRING,
  quantity: DataTypes.INTEGER.UNSIGNED,
  price: DataTypes.DECIMAL(10, 2),
  total: DataTypes.DECIMAL(10, 2),
  fkOrder: {
    type: DataTypes.UUID,
    field: 'fk_order',
    references: {
      model: PurchaseOrder.model,
      key: 'id',
    },
  },
  fkProduct: {
    type: DataTypes.UUID,
    field: 'fk_product',
    references: {
      model: Product.model,
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
