import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

const modelName = "Review";
const tableName = "reviews";
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
  description: DataTypes.STRING,
  rating: DataTypes.INTEGER,
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
