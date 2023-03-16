const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const modelName = 'Category';
const tableName = 'categories';
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
  name: DataTypes.STRING(50),
  description: DataTypes.STRING,
  image: DataTypes.STRING,
  slug: DataTypes.STRING,
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  parentId: {
    type: DataTypes.UUID,
    field: 'parent_id',
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
