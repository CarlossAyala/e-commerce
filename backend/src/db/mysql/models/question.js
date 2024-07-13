"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: DataTypes.STRING,
      answer: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "answered", "rejected"],
        defaultValue: "pending",
      },
      userId: DataTypes.UUID,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "Questions",
    },
  );
  return Question;
};
