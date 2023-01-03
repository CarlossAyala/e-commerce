const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const name = Joi.string();

const scopeId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  name: name.required(),
});
const getOne = Joi.object({
  id: id.required(),
});
const update = Joi.object({
  name: name.required(),
});

module.exports = {
  create,
  getOne,
  update,
  scopeId,
};
