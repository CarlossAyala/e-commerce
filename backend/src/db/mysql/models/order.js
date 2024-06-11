"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        as: "items",
      });
      Order.belongsTo(models.Address, {
        foreignKey: "addressId",
        as: "address",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: DataTypes.DECIMAL(10, 2),
      paymentIntentId: DataTypes.STRING,
      userId: DataTypes.UUID,
      addressId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
