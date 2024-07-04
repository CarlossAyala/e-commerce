"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class CategoryGallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
      // CategoryGallery.belongsTo(models.Category, {
      //   foreignKey: "categoryId",
      //   as: "category",
      // });
    }
  }
  CategoryGallery.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      filename: DataTypes.STRING,
      order: DataTypes.INTEGER,
      url: DataTypes.STRING,
      categoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "CategoryGallery",
      tableName: "CategoryGallery",
    },
  );
  return CategoryGallery;
};
