"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class StoreGallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // StoreGallery.belongsTo(models.Store, {
      //   foreignKey: "storeId",
      //   as: "store",
      // });
    }
  }
  StoreGallery.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      publicId: DataTypes.STRING,
      order: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StoreGallery",
      tableName: "StoreGallery",
      storeId: DataTypes.UUID,
    }
  );
  return StoreGallery;
};
