import { DataTypes } from "sequelize";
import Category from "./category.model.js";
import { sequelize } from "../connection.js";

const modelName = "CategoryImage";
const tableName = "category_images";
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
  filename: DataTypes.STRING,
  order: DataTypes.INTEGER,
  url: DataTypes.STRING,
  categoryId: {
    type: DataTypes.UUID,
    field: "category_id",
    references: {
      model: Category.model,
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
