"use strict";

import crypto from "crypto";
import { faker } from "@faker-js/faker";
import { bcrypt } from "../../../libs/index.js";
import { User, Store } from "../models";
import { slugify } from "../../../libs/index.js";
import env from "../../../config/environments";

const { seller } = env;

const createRandomUsers = async () => {
  const id = crypto.randomUUID();
  const name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const email = `${name}.${id}@gmail.com`;
  const password = await bcrypt.hash(seller.password);

  return {
    id,
    name,
    last_name,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNUsers = async (n = 1) => {
  const users = [];
  for (let i = 1; i <= n; i++) {
    const user = await createRandomUsers();
    users.push(user);
  }

  return users;
};

const createRandomStore = (userId) => {
  const id = crypto.randomUUID();
  const name = faker.company.name();
  const description = faker.lorem.lines(1);
  const slug = slugify(`${name}-${id}`);

  return {
    id,
    name,
    description,
    slug,
    seller_id: userId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateStores = (owners) => {
  const stores = [];

  for (const owner of owners) {
    const store = createRandomStore(owner.id);
    stores.push(store);
  }

  return stores;
};

export default {
  async up(queryInterface) {
    try {
      /*
        - Generate Store Owner Users
        - Generate one business for each one
      */
      const NUM_OWNERS = 100;

      const owners = await generateNUsers(NUM_OWNERS);

      // Generate business for each owner
      const stores = generateStores(owners);

      // Create users
      await queryInterface.bulkInsert(User.tableName, owners);
      // Create businesses
      await queryInterface.bulkInsert(Store.tableName, stores);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Store.tableName, null, {});
    await queryInterface.bulkDelete(User.tableName, null, {});
  },
};
