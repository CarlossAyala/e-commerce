"use strict";

const config = require("../../../config");
const Encrypter = require("../../../middlewares/auth/encrypter");
const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker/locale/es_MX");
const { User, Store } = require("../models");
const { slugify } = require("../../../libs");

const slugifyOptions = {
  lower: true,
  locale: "la",
};
const imageOptions = {
  with: 640,
  height: 480,
  randomize: true,
};

const createRandomUsers = async () => {
  const id = uuidv4();
  const userSex = faker.name.sex();
  const name = faker.name.firstName(userSex);
  const lastName = faker.name.lastName(userSex);
  const email = `${name}.${id}@gmail.com`;
  const password = await Encrypter.hash(config.seller.password);

  return {
    id,
    name,
    last_name: lastName,
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
  const id = uuidv4();
  const name = faker.company.name();
  const description = faker.lorem.lines(1);
  const profile = faker.image.business(...Object.values(imageOptions));
  const official = faker.datatype.boolean();
  const slug = slugify(`${name}-${id}`, slugifyOptions);

  return {
    id,
    name,
    description,
    profile,
    official,
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

module.exports = {
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
