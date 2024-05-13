"use strict";

import crypto from "crypto";
import { faker } from "@faker-js/faker";
import { Category } from "../models";
import { slugify } from "../../../libs/index.js";

const createRandomCategory = ({ parentId }) => {
  const id = crypto.randomUUID();
  const name = faker.commerce.department();
  const description = faker.lorem.lines(1);
  const slug = slugify(`${name}_${id}`);

  return {
    id,
    name,
    description,
    slug,
    parent_id: parentId,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const categoryGenerator = ({ quantity, parentCategory = {} }) => {
  const categories = [];
  for (let i = 0; i < quantity; i++) {
    const category = createRandomCategory({
      parentId: parentCategory.id,
    });
    categories.push(category);
  }

  return categories;
};

export default {
  async up(queryInterface) {
    const NUM_MAIN_CATEGORIES = 20;
    const NUM_SUB_CATEGORIES = 10;

    // Generate mains Categories
    const categories = categoryGenerator({
      quantity: NUM_MAIN_CATEGORIES,
    });
    await queryInterface.bulkInsert(Category.tableName, categories);

    // Generate sub-categories for each category
    const subCategories = [];
    for (const category of categories) {
      const subCategory = categoryGenerator({
        quantity: NUM_SUB_CATEGORIES,
        parentCategory: category,
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
