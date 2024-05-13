import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";
import Address from "./address.model.js";

const modelName = "Order";
const tableName = "orders";
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
  total: DataTypes.DECIMAL(10, 2),
  customerId: {
    type: DataTypes.UUID,
    field: "customer_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  addressId: {
    type: DataTypes.UUID,
    field: "address_id",
    references: {
      model: Address.model,
      key: "id",
    },
  },
  paymentIntentId: {
    type: DataTypes.STRING,
    field: "payment_intent_id",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
};

const model = sequelize.define(modelName, modelSchema, modelOptions);

export default {
  model,
  modelName,
  tableName,
  modelOptions,
  modelSchema,
};
