"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Bookmark.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      // Bookmark.belongsTo(models.Product, {
      //   foreignKey: "productId",
      //   as: "product",
      // });
    }
  }
  Bookmark.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
    }
  );
  return Bookmark;
};
