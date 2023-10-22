"use strict";

const { v4: uuidv4 } = require("uuid");
const { faker } = require("@faker-js/faker/locale/es_MX");
const { Category } = require("../models");
const { slugify } = require("../../../libs");

const imageOptions = {
  with: 640,
  height: 480,
  randomize: true,
};
const NUM_LINES = 1;

const createRandomCategory = ({ parentId, type }) => {
  const id = uuidv4();
  const name = faker.commerce.department();
  const image = faker.image.abstract(...Object.values(imageOptions));
  const description = faker.lorem.lines(NUM_LINES);
  const slug = slugify(`${name}_${id}`);

  return {
    id,
    name,
    description,
    image,
    slug,
    type,
    available: true,
    parent_id: parentId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const categoryGenerator = ({ quantity, parentCategory = {}, type }) => {
  const categories = [];
  for (let i = 0; i < quantity; i++) {
    const category = createRandomCategory({
      parentId: parentCategory.id,
      type,
    });
    categories.push(category);
  }

  return categories;
};

module.exports = {
  async up(queryInterface) {
    const NUM_MAIN_CATEGORIES = 20;
    const NUM_SUB_CATEGORIES = 10;

    // Generate mains Categories
    const categories = categoryGenerator({
      quantity: NUM_MAIN_CATEGORIES,
      type: Category.enums.type.main,
    });
    await queryInterface.bulkInsert(Category.tableName, categories);

    // Generate sub-categories for each category
    const subCategories = [];
    for (const category of categories) {
      const subCategory = categoryGenerator({
        quantity: NUM_SUB_CATEGORIES,
        parentCategory: category,
        type: Category.enums.type.sub,
      });
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
    const flattenedSubCategories = subCategories.flat();
    await queryInterface.bulkInsert(Category.tableName, flattenedSubCategories);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Category.tableName, null, {});
  },
};
