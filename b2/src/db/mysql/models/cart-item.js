"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartItem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
