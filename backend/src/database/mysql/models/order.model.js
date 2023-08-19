const { DataTypes } = require("sequelize");
const sequelize = require("../../../database/mysql");
const User = require("./user.model");

const modelName = "Order";
const tableName = "orders";
const modelOptions = {
  tableName,
  timestamps: false,
};
const enums = {
  pending: "pending",
  process: "in process",
  shipped: "shipped",
  delivered: "delivered",
  cancelled: "cancelled",
  return: "return",
  refunded: "refunded",
  completed: "completed",
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  total: DataTypes.DECIMAL(10, 2),
  street: DataTypes.STRING(100),
  apartmentNumber: {
    type: DataTypes.STRING(5),
    field: "apartment_number",
  },
  receiverName: {
    type: DataTypes.STRING(100),
    field: "receiver_name",
  },
  receiverPhone: {
    type: DataTypes.STRING(20),
    field: "receiver_phone",
  },
  zipCode: {
    type: DataTypes.STRING(5),
    field: "zip_code",
  },
  province: DataTypes.STRING(50),
  city: DataTypes.STRING(50),
  indications: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums),
    defaultValue: enums.pending,
  },
  customerId: {
    type: DataTypes.UUID,
    field: "customer_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    field: "payment_intent_id",
  },
  orderedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "ordered_at",
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
