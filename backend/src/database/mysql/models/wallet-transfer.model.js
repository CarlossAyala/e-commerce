const { DataTypes } = require('sequelize');
const sequelize = require('..');
const WalletStatus = require('./wallet-status.model');
const CardRegister = require('./card-register.model');
const User = require('./user.model');

const modelName = 'WalletTransfer';
const tableName = 'wallet_transfers';
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
  fkStatus: {
    type: DataTypes.UUID,
    field: 'fk_status',
    references: {
      model: WalletStatus.model,
      key: 'id',
    },
  },
  fkCardSender: {
    type: DataTypes.UUID,
    field: 'fk_card_sender',
    references: {
      model: CardRegister.model,
      key: 'id',
    },
  },
  fkCardReceiver: {
    type: DataTypes.UUID,
    field: 'fk_card_receiver',
    references: {
      model: CardRegister.model,
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
