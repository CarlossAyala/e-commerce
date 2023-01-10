const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string();
const description = Joi.string();

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description: description.required(),
});

const update = Joi.object({
  name,
  description,
});

module.exports = {
  resourceId,
  create,
  update,
};
