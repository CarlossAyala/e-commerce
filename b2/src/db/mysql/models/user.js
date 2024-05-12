"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Address);
      // User.hasOne(models.Store, {
      // 	foreignKey: "userId",
      // 	as: "store",
      // 	onDelete: "CASCADE"
      // });
      // User.hasMany(models.Bookmark);
      // User.hasMany(models.History);
      // User.hasMany(models.Order);
      // User.hasMany(models.Review);
      // User.hasOne(models.Cart);
      // User.hasMany(models.Question);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: "email",
      },
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
