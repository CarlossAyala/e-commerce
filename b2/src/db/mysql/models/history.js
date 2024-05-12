"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // History.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   as: "user",
      // });
      // History.belongsTo(models.Product, {
      //   foreignKey: "productId",
      //   as: "product",
      // });
    }
  }
  History.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
