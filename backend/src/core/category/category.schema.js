const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string().min(2).max(50);
const description = Joi.string().min(2).max(255);
const image = Joi.string();
const slug = Joi.string();
const available = Joi.boolean();
const parentId = id;

const categoryId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description,
  image,
  slug: slug.required(),
  available,
  parentId,
});

const update = Joi.object({
  name,
  description,
  image,
  slug,
  available,
  parentId,
});

const catBySlug = Joi.object({
  cat: slug.required(),
});

const subCatBySlug = Joi.object({
  cat: slug.required(),
  subCat: slug.required(),
});

module.exports = {
  categoryId,
  create,
  update,
  catBySlug,
  subCatBySlug,
};
