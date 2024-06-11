const crypto = require("crypto");
const { faker } = require("@faker-js/faker");
const { seller } = require("../../../config");
const encrypter = require("../../../utils/encrypter");

const generateRandomUser = async (input = {}) => {
  const name = input.name || faker.person.firstName();
  const lastName = input.lastName || faker.person.lastName();
  const email = input.email || faker.internet.email();
  const password = await encrypter.encrypt(input.password || seller.password);
  const isAdmin = input.isAdmin || false;

  return {
    id: crypto.randomUUID(),
    name,
    lastName,
    email,
    password,
    isAdmin,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const generateRandomCategory = (input = {}) => {
  const id = crypto.randomUUID();
  const name = faker.commerce.department();
  const slug = faker.helpers.slugify([id, name].join("").toLowerCase());

  return {
    id,
    name,
    description: faker.lorem.paragraph(),
    slug,
    parentId: input.parentId ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const generateRandomStore = ({ userId }) => {
  const id = crypto.randomUUID();
  const name = faker.company.name();
  const description = faker.lorem.paragraph();
  const slug = faker.helpers.slugify([id, name].join("").toLowerCase());

  return {
    id,
    name,
    description,
    slug,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const generateRandomProduct = ({ storeId, categoriesIds }) => {
  const id = crypto.randomUUID();
  const name = faker.commerce.productName();
  const description = faker.lorem.paragraph();
  const stock = 10;
  const sold = 0;
  const price = faker.commerce.price();
  const slug = faker.helpers.slugify([id, name].join("").toLowerCase());
  const available = true;
  const condition = "new";
  const categoryId = faker.helpers.arrayElement(categoriesIds);

  return {
    id,
    name,
    description,
    stock,
    sold,
    price,
    slug,
    available,
    condition,
    categoryId,
    storeId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = {
  generateRandomUser,
  generateRandomCategory,
  generateRandomStore,
  generateRandomProduct,
};
