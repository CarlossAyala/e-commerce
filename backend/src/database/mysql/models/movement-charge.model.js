const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const MovementType = require('./movement-type.model');
const Charge = require('./charge.model');

const modelName = 'MovementCharge';
const tableName = 'movement_charges';
const modelOptions = {
  tableName,
  timestamps: true,
};

const modelSchema = {
  fkMovement: {
    type: DataTypes.UUID,
    field: 'fk_movement',
    references: {
      model: MovementType.model,
      key: 'id',
    },
  },
  fkCharge: {
    type: DataTypes.UUID,
    field: 'fk_charge',
    references: {
      model: Charge.model,
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
