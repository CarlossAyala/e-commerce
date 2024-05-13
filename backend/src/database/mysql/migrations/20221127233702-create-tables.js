"use strict";

import models from "../models";

const createModels = Object.values(models);
const dropModels = [...createModels].reverse();

export default {
  async up(queryInterface) {
    Promise.all(
      createModels.map(({ tableName, modelSchema, modelOptions }) =>
        queryInterface.createTable(tableName, modelSchema, modelOptions)
      )
    );
  },

  async down(queryInterface) {
    for (const model of dropModels) {
      await queryInterface.dropTable(model.tableName);
    }
  },
};
