'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const slugify = require('slugify');
const { Business, Product, Category } = require('../models');

const slugifyOptions = {
  lower: true,
  locale: 'la',
};

const createRandomProduct = (categoryId, businessId) => {
  const priceOptions = {
    min: 1,
    max: 10_000,
    dec: 2,
    simbol: '',
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
    business_id: businessId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNProducts = (n = 1, category, business) => {
  const products = [];

  for (let i = 1; i <= n; i++) {
    const product = createRandomProduct(category.id, business.id);
    products.push(product);
  }

  return products;
};

const generateProductPerCategory = (categories, businesses) => {
  const PRODUCTS_PER_CATEGORY = 100;
  const limit = businesses.length - 1;
  let i = 0;

  const products = [];
  for (const category of categories) {
    const business = businesses.at(i);
    const product = generateNProducts(
      PRODUCTS_PER_CATEGORY,
      category,
      business
    );

    products.push(product);

    if (i === limit) i = 0;
    else i++;
  }

  return products;
};

module.exports = {
  async up(queryInterface) {
    try {
      // Get business
      const businesses = await Business.model.findAll();

      // Get Categories
      const categories = await Category.model.findAll();

      // Generate products to each category
      const products = generateProductPerCategory(categories, businesses);

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
