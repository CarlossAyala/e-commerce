import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import User from "./user.model.js";
import Product from "./product.model.js";

const modelName = "Question";
const tableName = "questions";
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  status: {
    answered: "answered",
    queue: "queue",
    rejected: "rejected",
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums.status),
    defaultValue: enums.status.queue,
  },
  customerId: {
    type: DataTypes.UUID,
    field: "customer_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  productId: {
    type: DataTypes.UUID,
    field: "product_id",
    references: {
      model: Product.model,
      key: "id",
    },
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
  enums,
  modelSchema,
};
