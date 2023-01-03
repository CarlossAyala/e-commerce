const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});
const scopeName = Joi.string();

const create = Joi.object({
  scopeName: scopeName.required(),
  userId: id.required(),
});

const getOne = Joi.object({
  id: id.required(),
});

const remove = Joi.object({
  id: id.required(),
});

module.exports = {
  create,
  getOne,
  remove,
};
