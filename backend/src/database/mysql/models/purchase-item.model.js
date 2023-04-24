const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const PurchaseOrder = require('./purchase-order.model');
const Product = require('./product.model');

const modelName = 'PurchaseItem';
const tableName = 'purchase_item';
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  quantity: DataTypes.INTEGER.UNSIGNED,
  price: DataTypes.DECIMAL(10, 2),
  purchaseId: {
    type: DataTypes.UUID,
    field: 'purchase_id',
    references: {
      model: PurchaseOrder.model,
      key: 'id',
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
    references: {
      model: Product.model,
      key: 'id',
    },
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
};
