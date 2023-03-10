const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');

const modelName = 'Role';
const tableName = 'roles';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  madeFor: {
    ecommerce: 'ecommerce',
    store: 'store',
    both: 'both',
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: DataTypes.STRING(50),
  description: DataTypes.STRING,
  madeFor: {
    type: DataTypes.ENUM,
    field: 'made_for',
    values: Object.values(enums.madeFor),
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
