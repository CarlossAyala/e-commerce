const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const quantity = Joi.number().integer().greater(0);

const uuidV4 = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  quantity: quantity.required(),
});

module.exports = {
  uuidV4,
  base,
};
