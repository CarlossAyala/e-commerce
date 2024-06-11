"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductGallery, {
        foreignKey: "productId",
        as: "gallery",
      });
      Product.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store",
      });
      Product.hasMany(models.Question, {
        foreignKey: "productId",
        as: "questions",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      sold: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      available: DataTypes.BOOLEAN,
      condition: {
        type: DataTypes.ENUM,
        values: ["new", "used", "reconditioned"],
      },
      categoryId: DataTypes.UUID,
      storeId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
    }
  );
  return Product;
};
