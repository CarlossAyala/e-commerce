const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./user.model');

const modelName = 'Card';
const tableName = 'cards';
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
  number: DataTypes.STRING(16),
  fullname: DataTypes.STRING,
  expiration: DataTypes.DATE,
  cvv: DataTypes.STRING(4),
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1_000_000,
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
};
