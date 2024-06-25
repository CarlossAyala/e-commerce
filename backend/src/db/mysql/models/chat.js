"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chat.belongsTo(models.User, {
        foreignKey: "customerId",
        as: "customer",
      });
      Chat.belongsTo(models.Store, {
        foreignKey: "storeId",
        as: "store",
      });
      Chat.hasMany(models.Message, {
        foreignKey: "chatId",
        as: "messages",
      });
    }
  }
  Chat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customerId: DataTypes.UUID,
      storeId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "Chats",
    },
  );
  return Chat;
};
