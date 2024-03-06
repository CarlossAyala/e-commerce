const Joi = require("joi");
const { Category } = require("../../../database/mysql/models");
const { main, single } = Category.enums.type;

const id = Joi.string().guid();

const name = Joi.string().label("Name").min(3).max(50).required();
const description = Joi.string()
  .label("Description")
  .min(3)
  .max(255)
  .required();
const type = Joi.string()
  .label("Type")
  .valid(...[main, single])
  .required();
const categoryId = id.label("Category");
const categoriesId = Joi.array().label("Categories").min(1).items(categoryId);

const create = Joi.object({
  name,
  description,
  type,
});

const categoryIds = Joi.object({
  categoriesId,
});

const update = Joi.object({
  name,
  description,
});

module.exports = {
  create,
  update,
  categoryIds,
};
