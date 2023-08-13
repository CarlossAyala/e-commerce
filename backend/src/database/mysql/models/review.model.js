const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Product = require('./product.model');
const OrderItem = require('./order-item.model');

const modelName = 'Review';
const tableName = 'reviews';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  status: {
    done: 'done',
    pending: 'pending',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  description: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislike: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums.status),
  },
  orderItemId: {
    type: DataTypes.UUID,
    field: 'order_item_id',
    references: {
      model: OrderItem.model,
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
  productId: {
    type: DataTypes.UUID,
    field: 'product_id',
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
  enums,
};
