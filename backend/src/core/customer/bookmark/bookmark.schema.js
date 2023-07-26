const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const resourceId = Joi.object({
  id: id.required(),
});

const base = Joi.object({
  productId: id.required(),
});

module.exports = {
  resourceId,
  base,
};
