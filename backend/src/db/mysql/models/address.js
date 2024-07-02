"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      phone: DataTypes.STRING(20),
      zipCode: DataTypes.STRING(5),
      province: DataTypes.STRING(50),
      city: DataTypes.STRING(50),
      street: DataTypes.STRING(100),
      apartmentNumber: DataTypes.STRING(5),
      indications: DataTypes.STRING,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Addresses",
    },
  );
  return Address;
};
