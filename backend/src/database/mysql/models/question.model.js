const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Product = require('./product.model');

const modelName = 'Question';
const tableName = 'questions';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  states: {
    answered: 'answered',
    queue: 'queue',
    rejected: 'rejected',
    duplicate: 'duplicate',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  question: DataTypes.STRING,
  states: {
    type: DataTypes.ENUM,
    values: Object.values(enums.states),
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
