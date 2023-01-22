const { DataTypes } = require('sequelize');
const sequelize = require('../../../database/mysql/index');
const OrderItem = require('./order-item.model');

const modelName = 'ReturnRequest';
const tableName = 'return_requests';
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  started: 'started',
  progress: 'In progress',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  opened: DataTypes.DATE,
  closed: DataTypes.DATE,
  total: DataTypes.DECIMAL(10, 2),
  price: DataTypes.DECIMAL(10, 2),
  quantity: DataTypes.INTEGER,
  aditional: DataTypes.STRING,
  states: {
    type: DataTypes.ENUM,
    values: Object.values(enums),
  },
  fkOrderItem: {
    type: DataTypes.UUID,
    field: 'fk_order_item',
    references: {
      model: OrderItem.model,
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
  enums,
};
