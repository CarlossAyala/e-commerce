const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const question = Joi.string().max(255);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  question: question.required(),
});

const update = Joi.object({
  question: question.required(),
});

module.exports = {
  resourceId,
  create,
  update,
};
