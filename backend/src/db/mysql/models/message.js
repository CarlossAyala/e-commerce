"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(_models) {
      // define association here
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: DataTypes.STRING,
      chatId: DataTypes.INTEGER,
      customerId: DataTypes.UUID,
      storeId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Message",
      tableName: "Messages",
    },
  );
  return Message;
};
