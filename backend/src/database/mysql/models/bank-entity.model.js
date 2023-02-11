const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const modelName = 'BankEntity';
const tableName = 'bank_entities';
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
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  identificationNumber: {
    type: DataTypes.INTEGER,
    field: 'identification_number',
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
