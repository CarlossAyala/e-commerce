const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string().max(50);
const description = Joi.string().max(255);

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
