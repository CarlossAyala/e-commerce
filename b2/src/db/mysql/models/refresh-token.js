"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class RefreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // RefreshToken.belongsTo(models.User);
    }
  }
  RefreshToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RefreshToken",
    }
  );
  return RefreshToken;
};
