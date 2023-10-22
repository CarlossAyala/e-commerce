const Joi = require("joi");
const { Category } = require("../../../database/mysql/models");
const { main, single } = Category.enums.type;

const id = Joi.string().guid({
  version: "uuidv4",
  separator: "-",
});

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
const categoriesId = Joi.array()
  .label("Categories")
  .min(1)
  .items(id.label("Category"));

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name,
  description,
  type,
});

const attach = Joi.object({
  categoryId: id.label("Category").required(),
  categoriesId,
});

const detach = Joi.object({
  categoryId: id.label("Category").required(),
  categoriesId,
});

const update = Joi.object({
  name,
  description,
});

module.exports = {
  resourceId,
  create,
  attach,
  update,
  detach,
};
