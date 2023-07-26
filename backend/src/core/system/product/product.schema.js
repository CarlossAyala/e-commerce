const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const question = Joi.string().min(3).max(255).required();

const resourceId = Joi.object({
  id: id.required(),
});

const newQuestion = Joi.object({
  question,
});

module.exports = {
  resourceId,
  newQuestion,
};
