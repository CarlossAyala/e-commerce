const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const modelName = 'AddressRegister';
const tableName = 'address_registers';
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
  contactName: {
    type: DataTypes.STRING(50),
    field: 'contact_name',
  },
  contactPhone: {
    type: DataTypes.STRING(50),
    field: 'contact_phone',
  },
  zipCode: {
    type: DataTypes.STRING(4),
    field: 'zip_code',
  },
  province: DataTypes.STRING(50),
  city: DataTypes.STRING(50),
  street: DataTypes.STRING(50),
  streetNumber: {
    type: DataTypes.STRING(5),
    field: 'street_number',
  },
  apartmentNumber: {
    type: DataTypes.STRING(5),
    field: 'apartment_number',
  },
  streetOne: {
    type: DataTypes.STRING(100),
    field: 'street_one',
  },
  streetTwo: {
    type: DataTypes.STRING(100),
    field: 'street_two',
  },
  aditional: DataTypes.STRING,
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
