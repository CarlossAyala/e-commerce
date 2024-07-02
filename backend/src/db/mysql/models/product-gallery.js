"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ProductGallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductGallery.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      publicId: DataTypes.STRING,
      order: DataTypes.INTEGER,
      url: DataTypes.STRING,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "ProductGallery",
      tableName: "ProductGallery",
    },
  );
  return ProductGallery;
};
