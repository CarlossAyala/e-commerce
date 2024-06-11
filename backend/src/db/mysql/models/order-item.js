"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      OrderItem.belongsTo(models.Review, {
        foreignKey: "reviewId",
        as: "review",
      });
    }
  }
  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(10, 2),
      orderId: DataTypes.UUID,
      productId: DataTypes.UUID,
      reviewId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "OrderItems",
    }
  );
  return OrderItem;
};
