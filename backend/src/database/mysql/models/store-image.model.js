import { DataTypes } from "sequelize";
import Store from "./store.model.js";
import { sequelize } from "../connection.js";

const modelName = "StoreImage";
const tableName = "store_images";
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
  publicId: {
    type: DataTypes.STRING,
    field: "public_id",
  },
  order: DataTypes.INTEGER,
  url: DataTypes.STRING,
  storeId: {
    type: DataTypes.UUID,
    field: "store_id",
    references: {
      model: Store.model,
      key: "id",
    },
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
