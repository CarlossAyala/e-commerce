const Joi = require('joi');

const id = Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
});

const title = Joi.string().max(50);
const comment = Joi.string().max(255);
const rating = Joi.number().integer().min(1).max(5);

const resourceId = Joi.object({
  id: id.required(),
});

const create = Joi.object({
  title: title.required(),
  comment: comment.required(),
  rating: rating.required(),
});

const update = Joi.object({
  title,
  comment,
  rating,
});

module.exports = {
  resourceId,
  create,
  update,
};
