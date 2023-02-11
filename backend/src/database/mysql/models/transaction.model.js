const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const MovementType = require('./movement-type.model');
const User = require('./user.model');

const modelName = 'Transaction';
const tableName = 'transactions';
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
  initialAmount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'initial_amount',
  },
  finalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'final_amount',
  },
  fkType: {
    type: DataTypes.UUID,
    field: 'fk_type',
    references: {
      model: MovementType.model,
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
