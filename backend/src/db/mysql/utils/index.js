const crypto = require("crypto");
const { faker } = require("@faker-js/faker");
const { seller } = require("../../../config");
const encrypter = require("../../../utils/encrypter");
const slugify = require("../../../utils/slugify");

/**
 * @typedef {object} User
 * @property {string} name
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {boolean} isAdmin
 * @property {boolean} isFromSeed
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {User} user
 * @returns {Promise<User>}
 */
const generateRandomUser = async (user = {}) => {
  const name = user.name ?? faker.person.firstName();
  const lastName = user.lastName ?? faker.person.lastName();
  const email = user.email ?? faker.internet.email();
  const password = await encrypter.encrypt(user.password ?? seller.password);
  const isAdmin = user.isAdmin ?? false;
  const isFromSeed = user.isFromSeed ?? false;

  return {
    id: crypto.randomUUID(),
    name,
    lastName,
    email,
    password,
    isAdmin,
    isFromSeed,
    createdAt: user.createdAt ?? new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} Category
 * @property {string} name
 * @property {string} description
 * @property {string} slug
 * @property {string} parentId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Category} category
 */
const generateRandomCategory = (category = {}) => {
  const id = crypto.randomUUID();
  const name = category.name ?? faker.commerce.department();
  const description = faker.lorem.paragraph();
  const slug = slugify(name);
  const parentId = category.parentId ?? null;

  return {
    id,
    name,
    description,
    slug,
    parentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} Store
 * @param {string} store.name
 * @param {string} store.description
 * @param {string} store.slug
 * @param {string} store.userId
 * @param {Date} store.createdAt
 * @param {Date} store.updatedAt
 */

/**
 * @param {Store} store
 * @returns {Store} store
 */
const generateRandomStore = ({ userId, createdAt }) => {
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
    createdAt: createdAt ?? new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} Product
 * @property {string} name
 * @property {string} description
 * @property {number} stock
 * @property {number} sold
 * @property {number} price
 * @property {string} slug
 * @property {boolean} available
 * @property {"new"|"used"|"reconditioned"} condition
 * @property {string} categoryId
 * @property {string} storeId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Product} product
 * @returns {Product} product
 */
const generateRandomProduct = ({ storeId, categoriesIds, createdAt }) => {
  const id = crypto.randomUUID();
  const name = faker.commerce.productName();
  const description = faker.lorem.paragraph();
  const stock = 100;
  const sold = 0;
  const price = faker.commerce.price({
    min: 10,
    max: 250,
  });
  const slug = slugify([id, name].join("").toLowerCase());
  const available = stock > 0;
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
    createdAt: createdAt ?? new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} CoverImage
 * @property {string} publicId
 * @property {number} order
 * @property {string} url
 * @property {string} categoryId
 */

/**
 * @param {CoverImage} image
 */
const generateCoverImage = (image) => {
  return {
    id: crypto.randomUUID(),
    publicId: image.publicId,
    order: image.order,
    url: image.url,
    categoryId: image.categoryId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} Question
 * @property {number} id
 * @property {"pending"|"answered"|"rejected"} status
 * @property {string} userId
 * @property {string} productId
 */

/**
 * @param {Question} question
 */
const generateRandomQuestion = ({ id, status, userId, productId }) => {
  const content = faker.lorem.sentence();
  const answer = status === "answered" ? faker.lorem.sentence() : null;

  return {
    id,
    content,
    answer,
    status,
    userId,
    productId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

/**
 * @typedef {object} Review
 * @property {number} id
 * @property {string} description
 * @property {number} rating
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @param {Review} review
 */
const generateRandomReview = ({ id }) => {
  return {
    id,
    description: faker.lorem.sentence(),
    rating: faker.number.int({
      min: 1,
      max: 5,
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = {
  generateRandomUser,
  generateRandomCategory,
  generateRandomStore,
  generateRandomProduct,
  generateCoverImage,
  generateRandomQuestion,
  generateRandomReview,
};
