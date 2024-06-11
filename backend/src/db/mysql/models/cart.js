"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
      userId: DataTypes.UUID,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "Carts",
    }
  );
  return Cart;
};
