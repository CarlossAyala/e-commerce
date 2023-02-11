const { DataTypes } = require('sequelize');
const sequelize = require('..');
const User = require('./user.model');
const Card = require('./card.model');

const modelName = 'WalletWithdrawal';
const tableName = 'wallet_withdrawals';
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
  amount: DataTypes.DECIMAL(10, 2),
  description: DataTypes.STRING,
  fkCard: {
    type: DataTypes.UUID,
    field: 'fk_card',
    references: {
      model: Card.model,
      key: 'id',
    },
  },
  fkUser: {
    type: DataTypes.UUID,
    field: 'fk_user',
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
