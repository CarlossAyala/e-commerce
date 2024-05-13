import { DataTypes } from "sequelize";
import Product from "./product.model.js";
import { sequelize } from "../connection.js";

const modelName = "ProductImage";
const tableName = "product_images";
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
  productId: {
    type: DataTypes.UUID,
    field: "product_id",
    references: {
      model: Product.model,
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
