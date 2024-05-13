import { DataTypes } from "sequelize";
import User from "./user.model.js";
import { sequelize } from "../connection.js";

const modelName = "Address";
const tableName = "addresses";
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
  name: DataTypes.STRING(100),
  phone: DataTypes.STRING(20),
  zipCode: {
    type: DataTypes.STRING(5),
    field: "zip_code",
  },
  province: DataTypes.STRING(50),
  city: DataTypes.STRING(50),
  street: DataTypes.STRING(100),
  apartmentNumber: {
    type: DataTypes.STRING(5),
    field: "apartment_number",
  },
  indications: DataTypes.STRING,
  customerId: {
    type: DataTypes.UUID,
    field: "customer_id",
    references: {
      model: User.model,
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at",
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
