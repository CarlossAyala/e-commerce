const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string().min(2).max(50);
const available = Joi.boolean();
const parentId = id;

const categoryId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  available,
  parentId,
});

const update = Joi.object({
  name,
  available,
});

module.exports = {
  categoryId,
  create,
  update,
};
