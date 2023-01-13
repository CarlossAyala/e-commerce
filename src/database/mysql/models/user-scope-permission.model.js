const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const UserScope = require('./user-scope.model');
const Permission = require('./permission.model');

const modelName = 'UserScopePermission';
const tableName = 'user_scope_permissions';
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
  fkUserScope: {
    type: DataTypes.UUID,
    field: 'fk_user_scope',
    references: {
      model: UserScope.model,
      key: 'id',
    },
  },
  fkPermission: {
    type: DataTypes.UUID,
    field: 'fk_permission',
    references: {
      model: Permission.model,
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
