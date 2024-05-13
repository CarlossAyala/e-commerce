"use strict";

import crypto from "crypto";
import { User } from "../models";
import { bcrypt } from "../../../libs/index.js";
import { admin } from "../../../config/environments";

const generateUser = async () => {
  const { name, lastName, email, password } = admin;

  return {
    id: crypto.randomUUID(),
    name,
    last_name: lastName,
    email,
    password: await bcrypt.hash(password),
    is_admin: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

export default {
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
