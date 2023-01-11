const Joi = require('joi');
const { Scope } = require('../../database/mysql/models');

const whiteList = Object.values(Scope.enums);

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string();
const description = Joi.string();
const madeFor = Joi.string().valid(...whiteList);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
  description: description.required(),
  madeFor: madeFor.required(),
});

const update = Joi.object({
  name,
  description,
  madeFor,
});

module.exports = {
  resourceId,
  create,
  update,
};
