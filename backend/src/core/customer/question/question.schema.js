const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const question = Joi.string().min(5).max(255).label('question').required();

const base = Joi.object({
  question,
});

const resourceId = Joi.object({
  id: id.required(),
});

module.exports = {
  base,
  resourceId,
};
