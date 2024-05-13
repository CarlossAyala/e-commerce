import { DataTypes } from "sequelize";
import User from "./user.model.js";
import { sequelize } from "../connection.js";

const modelName = "RefreshToken";
const tableName = "refresh_tokens";
const modelOptions = {
  tableName,
  timestamps: false,
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  token: DataTypes.STRING,
  userId: {
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: DataTypes.NOW,
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
