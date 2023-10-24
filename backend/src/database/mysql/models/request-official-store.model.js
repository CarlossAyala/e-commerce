const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Store = require("./store.model");

const modelName = "RequestOfficialStore";
const tableName = "requests_official_stores";
const modelOptions = {
  tableName,
  timestamps: true,
};
const enums = {
  status: {
    process: "in process",
    approved: "approved",
    rejected: "rejected",
  },
};

const modelSchema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  description: DataTypes.STRING,
  response: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums.status),
  },
  storeId: {
    type: DataTypes.UUID,
    field: "store_id",
    references: {
      model: Store.model,
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

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
  enums,
};
