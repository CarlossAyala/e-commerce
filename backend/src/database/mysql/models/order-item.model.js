import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import Order from "./order.model.js";
import Product from "./product.model.js";
import Review from "./review.model.js";

const modelName = "OrderItem";
const tableName = "orders_items";
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
  quantity: DataTypes.INTEGER.UNSIGNED,
  price: DataTypes.DECIMAL(10, 2),
  orderId: {
    type: DataTypes.UUID,
    field: "order_id",
    references: {
      model: Order.model,
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
  reviewId: {
    type: DataTypes.UUID,
    field: "review_id",
    references: {
      model: Review.model,
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
