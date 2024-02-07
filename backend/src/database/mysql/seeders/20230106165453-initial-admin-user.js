"use strict";

const { v4: uuidv4 } = require("uuid");
const config = require("../../../config");
const Encrypter = require("../../../middlewares/auth/encrypter");
const { User } = require("../models");

const generateUser = async () => {
  const { name, lastName, email, password } = config.admin;

  return {
    id: uuidv4(),
    name,
    last_name: lastName,
    email,
    password: await Encrypter.hash(password),
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = {
  async up(queryInterface) {
    try {
      const user = await generateUser();

      await queryInterface.bulkInsert(User.tableName, [user]);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(User.tableName, null, {});
  },
};
