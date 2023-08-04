'use strict';

const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const { faker } = require('@faker-js/faker/locale/es_MX');
const { Category } = require('../models');

const slugifyOptions = {
  lower: true,
  locale: 'la',
};
const imageOptions = {
  with: 640,
  height: 480,
  randomize: true,
};
const NUM_LINES = 1;

const createRandomCategory = (parentId = null) => {
  const id = uuidv4();
  const name = faker.commerce.department();
  const image = faker.image.abstract(...Object.values(imageOptions));
  const description = faker.lorem.lines(NUM_LINES);
  const slug = slugify(`${name}_${id}`, slugifyOptions);

  return {
    id,
    name,
    description,
    image,
    slug,
    parent_id: parentId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const generateNCategories = (n = 1, parentCategory = {}) => {
  const categories = [];
  for (let i = 1; i <= n; i++) {
    const category = createRandomCategory(parentCategory.id);
    categories.push(category);
  }

  return categories;
};

module.exports = {
  async up(queryInterface) {
    const NUM_MAIN_CATEGORIES = 20;
    const NUM_SUB_CATEGORIES = 10;

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
