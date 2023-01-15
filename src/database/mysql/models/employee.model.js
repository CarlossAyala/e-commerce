const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const User = require('./user.model');
const Business = require('./business.model');
const Scope = require('./scope.model');

const modelName = 'Employee';
const tableName = 'employees';
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
  userId: {
    type: DataTypes.UUID,
    field: 'user_id',
    references: {
      model: User.model,
      key: 'id',
    },
  },
  businessId: {
    type: DataTypes.UUID,
    field: 'business_id',
    references: {
      model: Business.model,
      key: 'id',
    },
  },
  scopeId: {
    type: DataTypes.UUID,
    field: 'scope_id',
    references: {
      model: Scope.model,
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
