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
      // Question.belongsTo(models.User);
      // Question.belongsTo(models.Product);
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: DataTypes.STRING,
      answer: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "answered", "rejected"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
