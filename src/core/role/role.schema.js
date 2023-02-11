const Joi = require('joi');
const { Role } = require('../../database/mysql/models');

const madeForEnums = Object.values(Role.enums.madeFor);

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string();
const description = Joi.string();
const madeFor = Joi.string().valid(...madeForEnums);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description: description.required(),
  madeFor: madeFor.required(),
});

const update = Joi.object({
  name: name.required(),
  description,
  madeFor: madeFor.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
