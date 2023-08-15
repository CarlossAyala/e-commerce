'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const slugify = require('slugify');
const { Store, Product, Category } = require('../models');

const slugifyOptions = {
  lower: true,
  locale: 'la',
};

const createRandomProduct = (categoryId, storeId) => {
  const priceOptions = {
    min: 1,
    max: 10_000,
    dec: 2,
    symbol: '',
  };
  const stockSoldOptions = {
    max: 1_000,
    min: 100,
    precision: 1,
  };
  const productCondition = Object.values(Product.enums.condition);

  const name = faker.commerce.product();
  const description = faker.commerce.productDescription();
  const stock = faker.datatype.number(stockSoldOptions);
  const sold = faker.datatype.number(stockSoldOptions);
  const slug = slugify(name, slugifyOptions);
  const price = +faker.commerce.price(...Object.values(priceOptions));
  const condition = faker.helpers.arrayElement(productCondition);

  return {
    id: uuidv4(),
    name,
    description,
    stock,
    sold,
    slug,
    price,
    available: true,
    condition,
    category_id: categoryId,
    store_id: storeId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNProducts = (n = 1, category, stores) => {
  const limit = stores.length - 1;
  let j = 0;
  const products = [];

  for (let i = 1; i <= n; i++) {
    const store = stores.at(i);
    const product = createRandomProduct(category.id, store.id);
    products.push(product);

    if (j === limit) j = 0;
    else j++;
  }

  return products;
};

const generateProductPerCategory = (categories, stores) => {
  const PRODUCTS_PER_CATEGORY = 50;

  const products = [];
  for (const category of categories) {
    const product = generateNProducts(PRODUCTS_PER_CATEGORY, category, stores);

    products.push(product);
  }

  return products;
};

module.exports = {
  async up(queryInterface) {
    try {
      // Get business
      const stores = await Store.model.findAll();

      // Get Categories
      const categories = await Category.model.findAll();

      // Generate products to each category
      const products = generateProductPerCategory(categories, stores);

      // Flat products because products are a array of arrays
      const flatProducts = products.flat();

      // Create products
      await queryInterface.bulkInsert(Product.tableName, flatProducts);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Product.tableName, null, {});
  },
};
