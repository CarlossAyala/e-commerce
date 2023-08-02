const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const base = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  comment: Joi.string().min(5).max(255).required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  resourceId,
  base,
};
