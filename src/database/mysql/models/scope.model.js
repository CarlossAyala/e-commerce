const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const ScopeType = require('./scope-type.model');
const Role = require('./role.model');

const modelName = 'Scope';
const tableName = 'scopes';
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
  fkType: {
    type: DataTypes.UUID,
    field: 'fk_type',
    references: {
      model: ScopeType.model,
      key: 'id',
    },
  },
  fkRole: {
    type: DataTypes.UUID,
    field: 'fk_role',
    references: {
      model: Role.model,
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
