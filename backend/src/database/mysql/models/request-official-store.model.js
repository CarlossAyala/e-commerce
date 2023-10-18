const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const Store = require("./store.model");

const modelName = "RequestOfficialStore";
const tableName = "request_official_store";
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
  status: {
    type: DataTypes.ENUM,
    values: Object.values(enums.status),
    defaultValue: enums.status.process,
  },
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

module.exports = {
  model,
  tableName,
  modelSchema,
  modelOptions,
  enums,
};
