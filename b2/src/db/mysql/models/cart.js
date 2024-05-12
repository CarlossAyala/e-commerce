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
      // Cart.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      // Cart.belongsTo(models.Product, {
      //   through: models.CartItem,
      // });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
