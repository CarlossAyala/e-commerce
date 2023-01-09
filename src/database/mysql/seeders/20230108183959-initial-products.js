'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const { Business, Product, Category } = require('../models');

const createRandomProduct = (categoryId, businessId) => {
  const priceOptions = {
    min: 1,
    max: 1_000_000,
    dec: 2,
    simbol: '',
  };
  const productCondition = Object.values(Product.enums.condition);

  const name = faker.commerce.product();
  const description = faker.commerce.productDescription();
  const stock = faker.datatype.number({
    min: 1,
  });
  const price = faker.commerce.price(
    priceOptions.min,
    priceOptions.max,
    priceOptions.dec,
    priceOptions.simbol
  );
  const condition = faker.helpers.arrayElement(productCondition);

  return {
    id: uuidv4(),
    name,
    description,
    stock,
    sold: 0,
    price,
    available: true,
    condition,
    fk_category: categoryId,
    fk_business: businessId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNProducts = (n = 1, category = {}, business = {}) => {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const product = createRandomProduct(category.id, business.id);
    products.push(product);
  }

  return products;
};

module.exports = {
  async up(queryInterface) {
    try {
      const NUM_PRODUCT_PER_BUSINESS = 5;

      // Get business
      const businesses = await Business.model.findAll();

      // Get Categories
      const categories = await Category.model.findAll();

      // Generate products for each business
      const products = [];
      for (const business of businesses) {
        const randomCategory = faker.helpers.arrayElement(categories);
        const product = generateNProducts(
          NUM_PRODUCT_PER_BUSINESS,
          randomCategory,
          business
        );
        products.push(product);
      }

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
