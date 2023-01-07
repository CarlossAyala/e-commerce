'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker/locale/es_MX');
const { Category } = require('../models');

const createRandomCategory = (parentId = null) => {
  const name = faker.helpers.unique(faker.commerce.department);

  return {
    id: uuidv4(),
    name,
    available: true,
    parent_id: parentId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNCategories = (n = 1, parentCategory = {}) => {
  const categories = [];
  for (let i = 1; i <= n; i++) {
    const category = createRandomCategory(parentCategory?.id);
    categories.push(category);
  }

  return categories;
};

module.exports = {
  async up(queryInterface) {
    const NUM_MAIN_CATEGORIES = 3;
    const NUM_SUB_CATEGORIES = 5;

    // Generate mains Categories
    const categories = generateNCategories(NUM_MAIN_CATEGORIES);
    await queryInterface.bulkInsert(Category.tableName, categories);

    // Generate sub-categories for each category
    const subCategories = [];
    for (const category of categories) {
      const subCategory = generateNCategories(NUM_SUB_CATEGORIES, category);
      subCategories.push(subCategory);
    }

    /* 
      subCategories are a array of arrays, so we need to flat them for bulkInsert method.
      subCategories before flat:
      [ 
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
        ...
      ] 
      subCategories after flat:
      [
        {}, {}, {},
        {}, {}, {},
        {}, {}, {},
        ...
      ]
    */
    const flatedSubCategories = subCategories.flat();
    await queryInterface.bulkInsert(Category.tableName, flatedSubCategories);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Category.tableName, null, {});
  },
};
