"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Store.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      // Store.hasMany(models.StoreGallery, {
      //   foreignKey: "storeId",
      //   as: "gallery",
      // });
      // Store.hasMany(models.Product, {
      //   foreignKey: "storeId",
      //   as: "products",
      // });
    }
  }
  Store.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      publicId: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: "slug",
      },
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
