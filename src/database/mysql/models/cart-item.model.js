const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const ShoppingCart = require('./shopping-cart.model');
const Product = require('./product.model');

const modelName = 'CartItem';
const tableName = 'cart_items';
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
  price: DataTypes.DECIMAL(10, 2),
  total: DataTypes.DECIMAL(10, 2),
  fkCart: {
    type: DataTypes.UUID,
    field: 'fk_cart',
    references: {
      model: ShoppingCart.model,
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
