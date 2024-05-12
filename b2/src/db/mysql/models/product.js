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
      // Product.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      //   as: "category",
      // });
      // Product.belongsTo(models.Store, {
      //   foreignKey: "storeId",
      //   as: "store",
      // });
      // Product.hasMany(models.ProductGallery, {
      //   foreignKey: "productId",
      //   as: "gallery",
      //   onDelete: "CASCADE",
      // });
      // Product.hasMany(models.Bookmark, {
      //   foreignKey: "productId",
      //   as: "bookmarks",
      // });
      // Product.hasMany(models.History, {
      //   foreignKey: "productId",
      //   as: "history",
      // });
      // Product.hasMany(models.OrderItem, {
      //   foreignKey: "productId",
      //   as: "orderItems",
      // });
      // Product.belongsToMany(models.Cart, {
      //   through: models.CartItem,
      // });
      // Product.hasMany(models.Question);
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
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
